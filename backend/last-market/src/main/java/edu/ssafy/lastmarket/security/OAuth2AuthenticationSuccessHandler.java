package edu.ssafy.lastmarket.security;

import edu.ssafy.lastmarket.domain.entity.Image;
import edu.ssafy.lastmarket.domain.entity.Location;
import edu.ssafy.lastmarket.domain.entity.Member;
import edu.ssafy.lastmarket.jwt.JwtManager;
import edu.ssafy.lastmarket.repository.MemberRepository;
import edu.ssafy.lastmarket.security.user.OAuth2UserImpl;
import io.netty.util.internal.StringUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final MemberRepository memberRepository;
    private final JwtManager jwtManager;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuth2UserImpl oAuth2User = (OAuth2UserImpl) authentication.getPrincipal();

        Optional<Member> memberOptional = memberRepository.findMemberFetchJoinByUsername(oAuth2User.getUsername());

        Member member = memberOptional.get();

        Location location = (member.getLocation() == null) ? null : member.getLocation();
        Image profile = (member.getProfile() == null) ? null : member.getProfile();

        String shortToken = jwtManager.generateJwtToken(member, location, profile);

        if (StringUtil.isNullOrEmpty(member.getNickname())) {
            Cookie cookie = new Cookie("Authentication", shortToken);
            cookie.setPath("/");
            cookie.setMaxAge(3600);
            response.addCookie(cookie);
            response.setStatus(302);

            response.setHeader("Location", "/signup?token=" + shortToken);
        } else {
            Cookie cookie = new Cookie("Authentication", shortToken);
            cookie.setPath("/");
            response.addCookie(cookie);
            cookie.setMaxAge(3600);
            response.setStatus(302);
            response.setHeader("Location", "/index?token=" + shortToken);
        }
    }
}
