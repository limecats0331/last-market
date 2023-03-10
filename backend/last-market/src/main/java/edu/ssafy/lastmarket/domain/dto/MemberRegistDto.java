package edu.ssafy.lastmarket.domain.dto;

import edu.ssafy.lastmarket.domain.entity.CategoryName;
import edu.ssafy.lastmarket.domain.entity.Lifestyle;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@Builder
@ToString
public class MemberRegistDto {
    private String nickname;
    private Lifestyle lifestyle;
    private String addr;
    private List<CategoryName> categories;
}
