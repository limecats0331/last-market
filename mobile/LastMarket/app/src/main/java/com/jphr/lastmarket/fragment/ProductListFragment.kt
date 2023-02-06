package com.jphr.lastmarket.fragment

import android.content.Context
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.activityViewModels
import androidx.recyclerview.widget.GridLayoutManager
import com.jphr.lastmarket.activity.MainActivity
import com.jphr.lastmarket.adapter.ProductListAdapter
import com.jphr.lastmarket.databinding.FragmentProductListBinding
import com.jphr.lastmarket.dto.ProductDTO
import com.jphr.lastmarket.dto.ProductDetailDTO
import com.jphr.lastmarket.dto.ProductX
import com.jphr.lastmarket.service.ProductService
import com.jphr.lastmarket.util.RecyclerViewDecoration
import com.jphr.lastmarket.util.RetrofitCallback
import com.jphr.lastmarket.viewmodel.MainViewModel

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [ProductListFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
private const val TAG = "ProductListFragment"
class ProductListFragment : Fragment() {
    // TODO: Rename and change types of parameters
    private var productDTO: MutableList<ProductX>? = null
    private var category: String? = null
    private lateinit var binding: FragmentProductListBinding
    private lateinit var productListAdapter:ProductListAdapter
    private lateinit var mainActivity: MainActivity
    private val mainViewModel by activityViewModels<MainViewModel>()

    override fun onAttach(context: Context) {
        super.onAttach(context)
        mainActivity=context as MainActivity
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        productDTO=mainViewModel.getProduct()
        category=mainViewModel.getCategory()
//        arguments?.let {
//            productDTO = it.getSerializable("products") as ProductDTO
//            category = it.getString("category")
//        }
        mainViewModel.getProduct()
        mainViewModel.getCategory()
        Log.d(TAG, "onCreate: $productDTO")
        Log.d(TAG, "onCreate: $category")

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        binding=FragmentProductListBinding.inflate(inflater,container,false)
        productListAdapter= ProductListAdapter(mainActivity)
        binding.recyclerview.apply {
            productListAdapter.list=productDTO
            layoutManager=GridLayoutManager(context,3)
            adapter=productListAdapter
            addItemDecoration(RecyclerViewDecoration(60,0))
        }
        binding.resultText.text="${category} 카테고리"
        productListAdapter.setItemClickListener(object : ProductListAdapter.ItemClickListener{
            override fun onClick(view: View, position: Int) {
                productListAdapter.list?.get(position)?.productId
                    ?.let {
                        ProductService().getProductDetail(it,ProductDetailCallback())
                    }

            }
        })
        return binding.root
    }

    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param param1 Parameter 1.
         * @param param2 Parameter 2.
         * @return A new instance of fragment ProductListFragment.
         */
        // TODO: Rename and change types and number of parameters
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            ProductListFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }
    inner class ProductDetailCallback: RetrofitCallback<ProductDetailDTO> {

        override fun onSuccess(
            code: Int,
            responseData: ProductDetailDTO,
            option: Boolean,
            word: String?,
            category: String?
        ) {

            mainViewModel.setProductDetail(responseData)
            mainActivity!!.changeFragment(7)
        }

        override fun onError(t: Throwable) {
            Log.d(TAG, t.message ?: "물품 정보 받아오는 중 통신오류")
        }

        override fun onFailure(code: Int) {
            Log.d(TAG, "onResponse: Error Code $code")
        }


    }
}