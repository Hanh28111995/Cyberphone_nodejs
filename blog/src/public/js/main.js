// var services = new Services();
// var cartArr = [];

// INIT-------------------------------------------------------------------
function getMyEle(id) {
    return document.getElementById(id);
}
function getMyClass(id) {
    return document.getElementsByClassName(id);
}


//Tìm kiếm một phần tử trong mảng bằng tên
function findInArrById(id, arrObject) {
    let result = -1;
    arrObject.forEach(function (item, index) {
        if (id == item.product.id) {
            result = index;
        }
    })
    return result;
}
function findInServerArrById(id, arrObject) {
    let result = -1;
    arrObject.forEach(function (item, index) {
        if (id == item.id) {
            result = index;
        }
    })
    return result;
}
//-------------------------------------------------------------------------


//FOR PHONE LIST-----------------------------------------------------------
//Render list phone
// function renderList(arr, filterValue) {
//     let content = "";
//     arr.forEach(function (item, index) {
//         if (filterValue === "none") {
//             $('#myOptions').change(function () {
//                 clear_slick();
//             });
//             content += `  
//             <div class="item-product col">
//                     <div class="card cardPhone">
//                         <img src="${item.img}" alt="...">
//                         <div class="card-body">
//                             <div class="d-flex justify-content-between">
//                                 <div>
//                                     <h3 class="cardPhone__title">${item.name}</h3>
//                                 </div>
//                                 <div>
//                                     <h3 class="cardPhone__title">$${item.price}</h3>
//                                 </div>
//                             </div>
//                             <p class="cardPhone__text">${item.desc}</p>
//                             <div class="d-flex justify-content-between">
//                                 <div class="cardPhone__detail">
//                                 <button  class="open-detail" onclick="open_d(${index})"><i>Show detail >></i></button>
//                                 <button  class="close-detail" onclick="close_d(${index})"><i></i>Hide detail >></i></button>
//                                     <div id="inner_detail" class="inner_detail">
//                                         <table>
//                                             <tr>
//                                                 <td>Screen</td>
//                                                 <td>${item.screen}</td>
//                                               </tr>
//                                               <tr>
//                                                 <td>BackCamera</td>
//                                                 <td>${item.backCamera}</td>
//                                               </tr>
//                                               <tr>
//                                                 <td>FrontCamera</td>
//                                                 <td>${item.frontCamera}</td>
//                                               </tr>
//                                         </table>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <button class="btnPhone-shadow" id="addToCartBtn_${item.id}" onclick="addAction(${item.id})"><i class="fa fa-shopping-cart"></i> Buy Now</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div> 
//                 `
//         }
//         else if (filterValue === "iphone") {
//             clear_slick();
//             if (item.type.toLowerCase() === "iphone") {
//                 content += `  
//                 <div class="item-product col">
//                         <div class="card cardPhone">
//                             <img src="${item.img}" alt="...">
//                             <div class="card-body">
//                                 <div class="d-flex justify-content-between">
//                                     <div>
//                                         <h3 class="cardPhone__title">${item.name}</h3>
//                                     </div>
//                                     <div>
//                                         <h3 class="cardPhone__title">$${item.price}</h3>
//                                     </div>
//                                 </div>
//                                 <p class="cardPhone__text">${item.desc}</p>
//                                 <div class="d-flex justify-content-between">
//                                     <div class="cardPhone__detail">
//                                     <button  class="open-detail" onclick="open_d(${index})"><i>Show detail >></i></button>
//                                     <button  class="close-detail" onclick="close_d(${index})"><i></i>Hide detail >></i></button>
//                                         <div id="inner_detail" class="inner_detail">
//                                             <table>
//                                                 <tr>
//                                                     <td>Screen</td>
//                                                     <td>${item.screen}</td>
//                                                   </tr>
//                                                   <tr>
//                                                     <td>BackCamera</td>
//                                                     <td>${item.backCamera}</td>
//                                                   </tr>
//                                                   <tr>
//                                                     <td>FrontCamera</td>
//                                                     <td>${item.frontCamera}</td>
//                                                   </tr>
//                                             </table>
//                                         </div>
//                                     </div>
//                                     <div>
//                                     <button class="btnPhone-shadow" id="addToCartBtn_${item.id}" onclick="addAction(${item.id})"><i class="fa fa-shopping-cart"></i> Buy Now</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div> 
//                     `
//             }
//         }
//         else if (filterValue === "samsung") {
//             clear_slick();
//             if (item.type.toLowerCase() === "samsung") {
//                 content += `  
//             <div class="item-product col">
//                     <div class="card cardPhone">
//                         <img src="${item.img}" alt="...">
//                         <div class="card-body">
//                             <div class="d-flex justify-content-between">
//                                 <div>
//                                     <h3 class="cardPhone__title">${item.name}</h3>
//                                 </div>
//                                 <div>
//                                     <h3 class="cardPhone__title">$${item.price}</h3>
//                                 </div>
//                             </div>
//                             <p class="cardPhone__text">${item.desc}</p>
//                             <div class="d-flex justify-content-between">
//                                 <div class="cardPhone__detail">
//                                 <button  class="open-detail" onclick="open_d(${index})"><i>Show detail >></i></button>
//                                 <button  class="close-detail" onclick="close_d(${index})"><i></i>Hide detail >></i></button>
//                                     <div id="inner_detail" class="inner_detail">
//                                         <table>
//                                             <tr>
//                                                 <td>Screen</td>
//                                                 <td>${item.screen}</td>
//                                               </tr>
//                                               <tr>
//                                                 <td>BackCamera</td>
//                                                 <td>${item.backCamera}</td>
//                                               </tr>
//                                               <tr>
//                                                 <td>FrontCamera</td>
//                                                 <td>${item.frontCamera}</td>
//                                               </tr>
//                                         </table>
//                                     </div>
//                                 </div>
//                                 <div>
//                                 <button class="btnPhone-shadow" id="addToCartBtn_${item.id}" onclick="addAction(${item.id})"><i class="fa fa-shopping-cart"></i> Buy Now</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div> 
//                 `
//             }
//         }
//     });
//     getMyEle("phoneList").innerHTML = content;
//     call_slick(arr);
//     //Tải từ Local Storage lên
//     getLocalStorage();
//     //Cập nhật SL đang chọn mua của 1 món hàng
//     renderItemQuantity();
//     //Cập nhật graphic cho Cart
//     renderCart();
//     //Tính tiền đang có trong Cart
//     calcTotalPrice();
// }

//Lấy data từ server và render ra màng hình
// function getListPhones() {
//     services.getListPhonesAPI()
//         .then(function (result) {
//             let filterValue = document.querySelector("#filter select").value;
//             renderList(result.data, filterValue);

//             cartArr.forEach(function (item) {
//                 if (findInServerArrById(item.product.id, result.data) === -1) {
//                     removeCartItem(item.product.id);
//                     if (!true) {
//                         getListPhones();
//                     }
//                 }
//             })
//         })

//         .catch(function (error) {
//             console.log(error);
//         })
// }

// getListPhones();

//Xử lý khi nhấn nút Add hoặc nút increase số lượng
// function addHandler(id) {
//     services.getPhoneAPI(id)
//         .then(function (result) {
//             if (findInArrById(result.data.id, cartArr) != -1) {
//                 cartArr[findInArrById(result.data.id, cartArr)].quantity += 1;
//             }
//             else {
//                 var cartItem = new CartItem(result.data, 1);
//                 cartArr.push(cartItem);
//             }
//             //             //Cập nhật SL đang chọn mua của 1 món hàng
//             renderItemQuantity();
//             //             //Cập nhật graphic cho Cart
//             renderCart();
//             //             //Tải xuống Local Storage
//             setLocalStorage();
//         })

//         .catch(function (error) {
//             console.log(error);
//             alert("Data has been changed, please reload a page!")
//         })
// }
//Kiểm tra trên data có sự thay đổi gì không trước khi add
// function addAction(id) {
//     services.getListPhonesAPI()
//         .then(function (result) {
//             let originalLength = cartArr.length;
//             cartArr.forEach(function (item, index) {
//                 if (findInServerArrById(item.product.id, result.data) === -1) {
//                     removeCartItem(item.product.id);
//                     getListPhones();
//                 }
//             })
//             let newLength = cartArr.length;
//             if (originalLength === newLength) {
//                 addHandler(id);
//             }
//         })

//         .catch(function (error) {
//             console.log(error);
//         })
// }
//Xử lý khi nhấn nút decrease số lượng
// function minusHandler(id) {
//     services.getPhoneAPI(id)
//         .then(function (result) {
//             if (findInArrById(result.data.id, cartArr) != -1) {
//                 if (cartArr[findInArrById(result.data.id, cartArr)].quantity > 1) {
//                     cartArr[findInArrById(result.data.id, cartArr)].quantity -= 1;
//                     //                    Cập nhật SL đang chọn mua của 1 món hàng
//                     renderItemQuantity();
//                     //                     //Cập nhật graphic cho Cart
//                     renderCart();
//                     //                     //Tải xuống Local Storage
//                     setLocalStorage();
//                 }
//                 //                 //Khi số lượng trừ sẽ bằng 0
//                 else if (cartArr[findInArrById(result.data.id, cartArr)].quantity === 1) {
//                     removeCartItem(result.data.id);
//                 }
//             }
//         })

//         .catch(function (error) {
//             console.log(error);
//             alert("Data changed, please reload a page");
//         })
// }
//Kiểm tra trên data có sự thay đổi gì không trước khi minus
// function minusAction(id) {
//     services.getListPhonesAPI()
//         .then(function (result) {
//             let originalLength = cartArr.length;
//             cartArr.forEach(function (item, index) {
//                 if (findInServerArrById(item.product.id, result.data) === -1) {
//                     removeCartItem(item.product.id);
//                     getListPhones();
//                 }
//             })
//             let newLength = cartArr.length;
//             if (originalLength === newLength) {
//                 minusHandler(id);
//             }
//         })

//         .catch(function (error) {
//             console.log(error);
//         })
// }
//---------------------------------------------------------------------------


//FOR CART-------------------------------------------------------------------
//RENDER CART
// function renderCart() {
//     let tbody = getMyEle("tableContent");
//     let tbody1 = getMyEle("tableContent1");
//     let content = "";
//     let content_1 = "";

//     cartArr.forEach(function (item, index) {
//         content += `
//     <tr>
//         <td>${index + 1}</td>
//         <td>${item.product.name}</td>
//         <td>$${item.product.price}</td>
//         <td>
//             <button onclick="minusAction(${item.product.id})"><i class="fas fa-angle-left"></i></button>
//             <span>${item.quantity}</span>
//             <button onclick="addAction(${item.product.id})"><i class="fas fa-angle-right"></i></button>
//         </td>
//         <td>$${item.totalPrice()}</td>
//         <td><button class="removeBtn" onclick="removeCartItem(${item.product.id})"><i class="fas fa-trash"></i></button></td>
//     </tr>
//         `;
//         content_1 += `
//     <tr>
//         <td>${item.product.name} * ${item.quantity}</td>
//         <td>$${item.product.price}</td>
//         <td>$${item.totalPrice()}</td>
//     </tr>
//     `;
//     })
//     tbody.innerHTML = content;
//     tbody1.innerHTML = content_1;
//     //Tính tổng tiền đang có trong cart
//     calcTotalPrice();


// }



//REMOVE CART ITEM FROM CART ARRAY
// function removeCartItem(id) {
//     let index = findInArrById(id, cartArr);
//     if (index != -1) {
//         cartArr[index].quantity = 0;
//         renderItemQuantity();
//         calcTotalPrice();
//         cartArr.splice(index, 1);
//         setLocalStorage();
//         renderCart();
//     }
// }

//CLEAR CART
// function clearCart() {
//     while (cartArr.length != 0) {
//         removeCartItem(cartArr[0].product.id);
//     }
// }
// function clearall() {
//     while (cartArr.length != 0) {
//         removeCartItem(cartArr[0].product.id);
//     }
//     document.getElementsByClassName("modal-backdrop")[0].remove();
// }

// //Tính tổng tiền đang có trong Cart và render
// function calcTotalPrice() {
//     let totalPrice = 0;
//     cartArr.forEach(function (item) {
//         totalPrice += item.totalPrice();
//     });
//     getMyEle("totalPrice").innerHTML = totalPrice;
//     getMyEle("totalPrice1").innerHTML = totalPrice;
// }

//Kiểm tra xem sản phầm còn ở server hay không

//--------------------------------------------------------------------------------


//FOR LOCAL STORAGE---------------------------------------------------------------
// TAI XUONG LOCAL STORAGE---------------------------
// function setLocalStorage() {
//     localStorage.setItem("cartArray", JSON.stringify(cartArr));
// }

// //GET DATA TU LOCAL STORAGE---------------------------
// function getLocalStorage() {
//     let temp = localStorage.getItem("cartArray");
//     let cartArrTemp = [];
//     if (temp != "" && temp != null) {
//         cartArrTemp = JSON.parse(temp);
//     }
//     cartArr = cartArrTemp.map(function (item) {
//         var temp2 = new CartItem(item.product, item.quantity);
//         return temp2;
//     })
// }
//--------------------------------------------------------------------------------
function change_show_item() {
    if ($(window).width() < 700) {
        $(".your-class").slick('slickSetOption', 'slidesToShow', 1);
        document.querySelector('.slick-prev').style.display = "block";
        document.querySelector('.slick-next').style.display = "block";
    }
    if (($(window).width() > 700) && ($(window).width() < 1020)) {
        $(".your-class").slick('slickSetOption', 'slidesToShow', 2);
        document.querySelector('.slick-prev').style.display = "block";
        document.querySelector('.slick-next').style.display = "block";
    }
    if (($(window).width() < 1500) && ($(window).width() > 1020)) {
        $(".your-class").slick('slickSetOption', 'slidesToShow', 3);
        document.querySelector('.slick-prev').style.display = "block";
        document.querySelector('.slick-next').style.display = "block";
    }
    if ($(window).width() > 1500) {
        $(".your-class").slick('slickSetOption', 'slidesToShow', 4);
        if ($('.item-product').length <= 4) {
            document.querySelector('.slick-prev').style.display = "none";
            document.querySelector('.slick-next').style.display = "none";
        }
        else {
            document.querySelector('.slick-prev').style.display = "block";
            document.querySelector('.slick-next').style.display = "block";
        }
    }
    $('.slick-slider').slick('slickGoTo', 0);
}

function open_d(id) {
    getMyClass('open-detail')[id].style.display = "none";
    getMyClass('close-detail')[id].style.display = "block";
    getMyClass('inner_detail')[id].style.display = "block";
}
function close_d(id) {
    getMyClass('open-detail')[id].style.display = "block";
    getMyClass('close-detail')[id].style.display = "none";
    getMyClass('inner_detail')[id].style.display = "none";
}

function call_slick() {

    $('.your-class').slick({
        speed: 1000,
        slidesToScroll: 1,
        autoplay: false,
        infinite: false,
        arrows: true,
        // slidesToShow: 4 ,
    });
    change_show_item();
};

$(window).resize(function () {
    $('.slick-slider').slick('slickGoTo', 0);
    change_show_item();
});

function clear_slick() {
    $('.your-class').slick('unslick'); /* ONLY remove the classes and handlers added on initialize */
    $('.item-product').remove(); /* Remove current slides elements, in case that you want to show new slides. */
}
// clear_slick();
call_slick();



// function cart_on(){
//     getMyEle("myModal").style.display = "block";
// }
// function cart_off(){
//     getMyEle("myModal").style.display = "none";
// }
