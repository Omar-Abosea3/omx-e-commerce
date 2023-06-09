import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import $ from 'jquery';

export const getCartItems=createAsyncThunk('getitem/getCartItems' , async function(id){
    try {
        const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
          {
            productId: id,
          },
          {
            headers: {
              token: localStorage.getItem("tkn1"),
            },
          }
        );
        
        if (data.status === "success") {
            $('.sucMsg').fadeIn(500, function () {
                setTimeout(() => {
                    $('.sucMsg').fadeOut(500 )
                }, 1000);
            })
          return true , data ;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
})

const getCartSlice = createSlice({
    name:'getitem',
    initialState:{
        CartProducts:null,
        cartItems:0
    },

    extraReducers:function(builder){
        builder.addCase(getCartItems.fulfilled , function(state , action){
            state.CartProducts = action.payload;
            state.cartItems = action.payload.numOfCartItems;
            console.log(action.payload);
        })
    }
    
})
export default getCartSlice.reducer;