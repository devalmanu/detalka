document.addEventListener('DOMContentLoaded', () => {
   const burger = document.querySelector('[data-burger]');
   const overlayMenu = document.querySelector('.overlay-menu');
   const nav = document.querySelector('[data-nav]');
   const navItems = nav.querySelectorAll('a');
   const body = document.body;
   const header = document.querySelector('.header');
   const inputs = document.querySelectorAll('input');
   const textareas = document.querySelectorAll('textarea');
   const headerHeight = header.offsetHeight;

   const btnsPopup = document.querySelectorAll('.btn-popup');
   const modalOverlay = document.querySelector('.modal-overlay');
   const modalCloseAll = document.querySelectorAll('.modal-close');
   const modalsWindows = document.querySelectorAll('.modal-wind');

   document.querySelector(':root').style.setProperty('--header-height', `${headerHeight}px`);
   // burder open/close
   burger.addEventListener('click', (e) => {
      body.classList.toggle('stop-scroll');
      burger.classList.toggle('burger--active');
      nav.classList.toggle('nav--visible');
   });

   // click item menu -> no-scroll + close menu
   navItems.forEach(el => {
      el.addEventListener('click', () => {
         body.classList.remove('stop-scroll');
         burger.classList.remove('burger--active');
         nav.classList.remove('nav--visible');
      });
   });

   // click overlay - burder close
   overlayMenu.addEventListener('click', (e) => {
      if (e.target == overlayMenu) {
         body.classList.remove('stop-scroll');
         burger.classList.remove('burger--active');
         nav.classList.remove('nav--visible');
      }
   });

   // scroll into block class link-button
   document.querySelectorAll('a.link-button[href^="#"').forEach(link => {
      link.addEventListener('click', function (e) {
         e.preventDefault();

         let href = this.getAttribute('href').substring(1);

         const scrollTarget = document.getElementById(href);
         const topOffsetHeader = document.querySelector('.header').offsetHeight;
         const elementPosition = scrollTarget.getBoundingClientRect().top;
         const offsetPosition = elementPosition;

         window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
         });
      });
   });

   function openPopup(path) {
      modalsWindows.forEach((el) => {
         el.classList.remove('modal--visible');
      });
      document.querySelector(`[data-target=${path}]`).classList.add('modal--visible');
      body.classList.add('stop-scroll')
      modalOverlay.classList.add('modal-overlay--visible');
   }

   btnsPopup.forEach((el) => {
      el.addEventListener('click', (e) => {
         let path = e.currentTarget.getAttribute('data-path');
         openPopup(path)
      });
   });

   modalOverlay.addEventListener('click', (e) => {
      if (e.target == modalOverlay) {
         modalOverlay.classList.remove('modal-overlay--visible');
         modalsWindows.forEach((el) => {
            el.classList.remove('modal--visible');
         });
         body.classList.remove('stop-scroll')
      }
   });

   modalCloseAll.forEach((modalClose) => {
      modalClose.addEventListener('click', (e) => {

         if (e.target == modalClose) {
            modalOverlay.classList.remove('modal-overlay--visible');
            modalsWindows.forEach((el) => {
               el.classList.remove('modal--visible');
            });
            body.classList.remove('stop-scroll')
         }
      });
   })



   const defaultSelect = () => {
      elementSelects.forEach(select => {
         new Choices(select, {
            searchEnabled: false,
            shouldSort: false,
         });

         let ariaLabel = select.getAttribute('aria-label');
         select.closest('.choices').setAttribute('aria-label', ariaLabel);
      });

   };

   const elementSelects = document.querySelectorAll('.select-default');
   if (elementSelects) {
      defaultSelect();
   }

   // animate input
   if (inputs) {
      inputs.forEach(input => {
         input.addEventListener("input", () => {
            input.classList.add("filled")
         })
         input.addEventListener("focus", () => {
            input.classList.add("filled")
         })
         input.addEventListener("blur", () => {
            if (input.value.length === 0) {
               input.classList.remove("filled")
            }
         })
      })
   }

   if (textareas) {
      textareas.forEach(textarea => {
         textarea.addEventListener('keyup', (e) => {
            textarea.classList.add('filled');
         });
         textarea.addEventListener("focus", () => {
            textarea.classList.add("filled")
         })
         textarea.addEventListener("blur", () => {
            if (textarea.value.length === 0) {
               textarea.classList.remove("filled")
            }
         })
      })
   }

   checkoutActions();
   initFilterSearch();

   function initFilterSearch() {
      let filterItemSearch = document.querySelectorAll(".search__inner-input");

      if (filterItemSearch) {
         filterItemSearch.forEach(item => {
            let itemSearch = item.querySelector(".search__input");

            let filterClearItem = item.querySelector(".search__reset");
            filterClearItem.addEventListener("click", () => {
               itemSearch.value = ""
               itemSearch.classList.remove("filled")
            });
         })
      }
   }

   function checkoutActions() {
      const deliveryRadio = document.querySelectorAll(".j-delivery-radio");
      const deliveryTabs = document.querySelectorAll(".j-delivery-tab");
      if (deliveryRadio.length > 0 && deliveryTabs.length > 0)
         initRadioTabs(deliveryRadio, deliveryTabs)

      const paymentRadio = document.querySelectorAll(".j-payment-radio");
      const paymentTabs = document.querySelectorAll(".j-payment-tab");
      if (paymentRadio.length > 0 && paymentTabs.length > 0)
         initRadioTabs(paymentRadio, paymentTabs)
   }

   function initRadioTabs(radios, tabs) {
      radios.forEach(radio => {
         radioCheck(radio, tabs);

         radio.addEventListener("change", () => {
            radioCheck(radio, tabs)
         })
      })
   }

   function radioCheck(radio, tabs) {
      if (radio.checked) {
         const currentTab = radio.dataset.tab;

         if (typeof currentTab !== "undefined") {
            // обязательные инпуты
            tabs.forEach(tab => {
               const requiredInputs = tab.querySelectorAll("[data-required]");
               if (tab.id === currentTab) {
                  tab.removeAttribute("hidden");
                  // в текущем табе проставить атрибут true обязательным инпутам
                  requiredInputs?.forEach(input => {
                     input.setAttribute("data-required", "true")
                  });
               } else {
                  tab.setAttribute("hidden", "");
                  // в не текущем табе проставить атрибут false обязательным инпутам,
                  // так как они уже не обязательны
                  requiredInputs?.forEach(input => {
                     input.setAttribute("data-required", "false")
                  });
               }
            })
         }
      }
   }

   const mainSlider = document.querySelector(".banner-swiper");
   if (mainSlider) {
      const bannerSlider = new Swiper(mainSlider, {
         slidesPerView: 1,
         spaceBetween: 0,
         watchOverflow: true,
         containerModifierClass: 'banner-slider-',
         pagination: {
            el: '.swiper-pagination.banner-swiper-pagination',
            type: 'bullets',
            clickable: true,
         },

         navigation: {
            nextEl: document.querySelector(".swiper-button-next.banner-nav--next"),
            prevEl: document.querySelector(".swiper-button-prev.banner-nav--prev"),
            // disabledClass: 'banner-lock'
         },
      });
   }
   // category on main page
   const mainCategoryList = document.querySelector(".main-category__list");
   if (mainCategoryList) {
      let catList = new Swiper(mainCategoryList, {
         slidesPerView: "auto",
         spaceBetween: 6,
         watchOverflow: true,
         pagination: {
            el: mainCategoryList.querySelector(".swiper-pagination.main-category-pagination"),
            type: "progressbar",
         },
      });
   }
   // products slider on main page
   let productsList = document.querySelectorAll(".products__list");
   if (productsList) {
      productsList.forEach(function (list) {
         let productsSwiper = list.querySelector(".products-swiper");
         if (productsSwiper) {

            let nextButton = list.querySelector(".swiper-button-next.swiper-products--next");
            let prevButton = list.querySelector(".swiper-button-prev.swiper-products--prev");
            new Swiper(productsSwiper, {
               slidesPerView: 1,
               spaceBetween: 24,
               watchOverflow: true,
               navigation: {
                  nextEl: nextButton,
                  prevEl: prevButton,
               },
               pagination: {
                  el: list.querySelector(".swiper-pagination.products-swiper-pagination"),
                  type: "progressbar",
               },
               grid: {
                  rows: 1,
                  fill: 'column'
               },
               breakpoints: {
                  320: {
                     grid: {
                        rows: 2,
                     },
                     spaceBetween: 12,
                  },
                  578: {
                     spaceBetween: 18,
                  },
                  992: {
                     grid: {
                        rows: 1,
                     },
                     spaceBetween: 24,
                  },
               },

            });
         }
      });
   }
   // detail slider
   const detailSwiper = document.querySelector('.detail-images');
   if (detailSwiper) {
      const detailImagesThumbs = new Swiper(".detail-images__thumb", {
         spaceBetween: 12,
         freeMode: true,
         watchSlidesProgress: true,
         slideToClickedSlide: true,
         slidesPerView: 5,
         breakpoints: {
            320: {
               spaceBetween: 6,
               slidesPerView: 5,
            },
            992: {
               spaceBetween: 12,
               slidesPerView: 5,
            }
         }
      });
      const detailImagesMain = new Swiper(".detail-images__swiper", {
         spaceBetween: 12,
         slidesPerView: 1,
         loop: true,
         navigation: {
            nextEl: detailSwiper.querySelector('.swiper-button-next.detail-images--next'),
            prevEl: detailSwiper.querySelector('.swiper-button-prev.detail-images--prev'),
         },
         thumbs: {
            swiper: detailImagesThumbs,
         },
      });
   }
   // map on contacts
   var mapDetalka = document.querySelector(".shop-ymaps");
   if (mapDetalka) {
      ymaps.ready(() => {
         initMap(mapDetalka);
      });
   }
   // opened filter items
   const filterItems = document.querySelectorAll('.filter__item');
   if (filterItems) {
      filterItems.forEach(el => {
         const control = el.querySelector('.filter__control');
         control.addEventListener('click', (e) => {
            const self = e.target;
            const parentSelf = self.closest('.filter__item');
            const content = parentSelf.querySelector('.filter__content');

            parentSelf.classList.toggle('open');
            if (parentSelf.classList.contains('open')) {
               self.setAttribute('aria-expanded', true);
               content.setAttribute('aria-hidden', false);
               content.style.maxHeight = content.scrollHeight + 'inherit';
            } else {
               self.setAttribute('aria-expanded', false);
               content.setAttribute('aria-hidden', true);
               content.style.maxHeight = null;
            }
         });
      });
   }
   /* filter actions */
   document.addEventListener("click", (event) => {
      if (window.innerWidth <= 992) {
         const target = event.target;
         if (target.classList.contains("j-filter-open") || target.closest(".j-filter-open")) {
            openFilter()
         } else if (target.classList.contains("j-filter-close") || target.closest(".j-filter-close")) {
            closeFilter()
         }
      }
   })
   /* range */
   initRange();
   function initRange() {
      const ranges = document.querySelectorAll(".j-range");
      if (ranges.length > 0) {
         ranges.forEach(range => {
            const parent = range.closest(".rangeBlock");

            let inputMin = parent.querySelector(".j-range-min"),
               inputMax = parent.querySelector(".j-range-max"),
               min = range.dataset.min ? +range.dataset.min : 0,
               max = range.dataset.max ? +range.dataset.max : 1,
               step = (range.dataset.step) ? +(range.dataset.step) : 0.1;

            noUiSlider.create(range, {
               start: [+inputMin.value, +inputMax.value],
               connect: true,
               step: step,
               range: {
                  'min': min,
                  'max': max
               },
               format: {
                  from: (value) => {
                     return Number(value).toFixed();
                  },
                  to: (value) => {
                     return Number(value).toFixed();
                  }
               }
            });

            range.noUiSlider.on('slide', function (values) {
               inputMin.value = values[0]
               inputMax.value = values[1]
            });
            range.noUiSlider.on('change', function () {
               inputMin.dispatchEvent(new Event('change'));
               inputMax.dispatchEvent(new Event('change'));
            });


            inputMin.addEventListener("input", clearValue)
            inputMax.addEventListener("input", clearValue)

            inputMin?.addEventListener("change", inputMinHandler)
            inputMax?.addEventListener("change", inputMaxHandler)

            function inputMinHandler() {
               let value = +inputMin.value, newValue = value;
               if (value < min) {
                  newValue = min;
               } else if (value > inputMax.value) {
                  newValue = +inputMax.value;
               } else if (value > max) {
                  newValue = max;
               }

               inputMin.value = newValue;
               range.noUiSlider.set([newValue, inputMax.value]);
            }

            function inputMaxHandler() {
               let value = +inputMax.value, newValue = value;

               if (value < min) {
                  newValue = min;
               } else if (value < +inputMin.value) {
                  newValue = +inputMin.value;
               } else if (value > max) {
                  newValue = max;
               }

               inputMax.value = newValue;
               range.noUiSlider.set([inputMin.value, newValue]);
            }

         })
      }
   }

   let qtyInputs = document.querySelectorAll(".qty-input");
   if (qtyInputs) {
      function QtyInput() {
         if (!qtyInputs.length) {
            return;
         }
         qtyInputs.forEach(function (qtyInput) {
            let inputs = qtyInput.querySelectorAll(".product-qty");
            let countBtns = qtyInput.querySelectorAll(".qty-count");
            let qtyMin = parseInt(inputs[0].getAttribute("min")) || 0;
            let qtyMax = parseInt(inputs[0].getAttribute("max")) || Infinity;

            inputs.forEach(function (input) {
               input.addEventListener("change", function () {
                  let minusBtn = this.closest(".qty-input").querySelector(".qty-count--minus");
                  let addBtn = this.closest(".qty-input").querySelector(".qty-count--add");
                  let qty = parseInt(this.value);

                  if (isNaN(qty) || qty <= qtyMin) {
                     this.value = qtyMin;
                     if (minusBtn) minusBtn.disabled = true;
                  } else {
                     if (minusBtn) minusBtn.disabled = false;

                     if (qty >= qtyMax) {
                        this.value = qtyMax;
                        if (addBtn) addBtn.disabled = true;
                     } else {
                        this.value = qty;
                        if (addBtn) addBtn.disabled = false;
                     }
                  }
               });
            });

            countBtns.forEach(function (btn) {
               btn.addEventListener("click", function () {
                  let operator = this.dataset.action;
                  let input = this.closest(".qty-input").querySelector(".product-qty");
                  let qty = parseInt(input.value);

                  if (operator == "add") {
                     qty += 1;
                     let minusBtn = this.closest(".qty-input").querySelector(".qty-count--minus");
                     if (minusBtn && qty >= qtyMin + 1) {
                        minusBtn.disabled = false;
                     }

                     if (qty >= qtyMax) {
                        this.disabled = true;
                     }
                  } else {
                     qty = qty <= qtyMin ? qtyMin : (qty -= 1);

                     if (qty == qtyMin) {
                        this.disabled = true;
                     }

                     let addBtn = this.closest(".qty-input").querySelector(".qty-count--add");
                     if (addBtn && qty < qtyMax) {
                        addBtn.disabled = false;
                     }
                  }

                  input.value = qty;
               });
            });
         });
      };

      QtyInput();
   }

   function stateCalc(form, input, btn) {
      if (input.checked) {
         btn.disabled = false;
         form.classList.remove('check-error');
      } else {
         btn.disabled = true;
         form.classList.add('check-error');
      }
   }

   const telSelectorS = document.querySelectorAll('.j-phone-mask');
   // inputmask
   if (telSelectorS) {
      telSelectorS.forEach(item => {
         const inputMask = new Inputmask('+7 (999) 999-99-99');
         inputMask.mask(item);
      })
   }

   // // const checkoutForm = document.querySelector('.checkout__content-form');
   const callBackForm = document.querySelector('.form-modal-callback');
   // // const accountForm = document.querySelector('.account-lk__body-form');
   // // const resetPassForm = document.querySelector('.account-reset__form');
   // const loginForm = document.querySelector('.form-modal-auth');

   if (callBackForm) {
      // const telCallBack = callBackForm.querySelector('input[type="tel"]');
      let btnCallBackForm = callBackForm.querySelector('.btn-submit');
      btnCallBackForm.disabled = true;
      let inputCheckCallBack = callBackForm.querySelector("#styled-checkbox-callback");
      // проверка соглашения
      function stateCalcCallBack() {
         if (inputCheckCallBack.checked) {
            btnCallBackForm.disabled = false;
         } else {
            btnCallBackForm.disabled = true;
         }
      }

      stateCalcCallBack();
      inputCheckCallBack.addEventListener("change", stateCalcCallBack)

      const validationCallBack = new JustValidate('.form-modal-callback', {
         validateBeforeSubmitting: true,
         testingMode: true,
      });

      validationCallBack
         .addField('.callback-name', [
            {
               rule: 'minLength',
               value: 3,
               errorMessage: 'Введите минимум 3 символа',
            },
            {
               rule: 'maxLength',
               value: 2,
               errorMessage: 'Введите не больше 20 символов',
            },
            {
               rule: 'required',
               value: true,
               errorMessage: 'Поле обязательно для заполнения',
            }
         ])
         .addField('.callback-tel', [
            {
               rule: 'required',
               value: true,
               errorMessage: 'Поле обязательно для заполнения',
            },
            {
               rule: 'function',
               validator: function () {
                  const phoneBackForm = callBackForm.querySelector('input[type="tel"]').inputmask.unmaskedvalue();
                  return phoneBackForm.length === 10;
               },
               errorMessage: 'Введите корректный номер',
            },
         ])
         .addField('.input-check', [
            {
               rule: 'required',
               validator: function () {
                  inputCheckCallBack.addEventListener("change", stateCalcCallBack)
               },
               errorMessage: 'Обязательное соглашение',
            }
         ])

         .onSuccess((event) => {
            console.log('Проверка проходит и форма отправлена', event);
            // если проверка прошла показать popup
            // openPopup('popup-success')

            // let formData = new FormData(event.target);
            // console.log(...formData);

            // let xhr = new XMLHttpRequest();

            // xhr.onreadystatechange = function () {
            //    if (xhr.readyState === 4) {
            //       // let response = JSON.parse(xhr.responseText);
            //       if (xhr.status === 200) {
            //          console.log('Отправлено');
            //          // если проверка прошла показать popup
            //          // openPopup('popup-success')
            //       } else {
            //          openPopup('popup-success-error')
            //       }
            //    }
            // }
            // xhr.open('POST', callBackForm.action, true);
            // xhr.send(formData);
            // event.target.reset();
         });
   }
   // if (loginForm) {
   //    const telLoginForm = loginForm.querySelector('input[type="tel"]');

   //    let btnLoginForm = loginForm.querySelector('.btn-submit');
   //    btnLoginForm.disabled = true;

   //    let inputCheckLoginForm = loginForm.querySelector("#styled-checkbox-auth");
   //    // проверка соглашения
   //    function stateLoginForm() {
   //       if (inputCheckLoginForm.checked) {
   //          btnLoginForm.disabled = false;
   //          loginForm.classList.remove('check-error');
   //       } else {
   //          btnLoginForm.disabled = true;
   //          loginForm.classList.add('check-error');
   //       }
   //    }
   //    stateLoginForm();
   //    inputCheckLoginForm.addEventListener("change", stateLoginForm)

   //    const validationLoginForm = new JustValidate('.form-modal-auth', {
   //       validateBeforeSubmitting: true,
   //       testingMode: true,
   //    });

   //    validationLoginForm
   //       .addField('.input-auth-tel', [
   //          {
   //             rule: 'required',
   //             value: true,
   //             errorMessage: 'Поле обязательно для заполнения',
   //          },
   //          {
   //             rule: 'function',
   //             validator: function () {
   //                const phoneloginForm = loginForm.querySelector('input[type="tel"]').inputmask.unmaskedvalue();
   //                return phoneloginForm.length === 10;
   //             },
   //             errorMessage: 'Введите корректный номер',
   //          },
   //       ])
   //       .addField('.input-auth-pass', [
   //          {
   //             rule: 'required',
   //             value: true,
   //             errorMessage: 'Поле обязательно для заполнения',
   //          },
   //       ])
   //       .addField('#styled-checkbox-auth', [
   //          {
   //             rule: 'required',
   //             validator: function () {
   //                inputCheckLoginForm.addEventListener("change", stateLoginForm)
   //             },
   //             errorMessage: 'Обязательное соглашение',
   //          }
   //       ])

   //       .onSuccess((event) => {
   //          console.log('Проверка проходит и форма отправлена', event);
   //          // если проверка прошла показать popup
   //          // openPopup('popup-success')

   //          let formData = new FormData(event.target);
   //          console.log(...formData);

   //          let xhr = new XMLHttpRequest();

   //          xhr.onreadystatechange = function () {
   //             if (xhr.readyState === 4) {
   //                // let response = JSON.parse(xhr.responseText);
   //                if (xhr.status === 200) {
   //                   console.log('Отправлено');
   //                   // если проверка прошла показать popup
   //                   // openPopup('popup-success')
   //                } else {
   //                   // openPopup('popup-success-error')
   //                }
   //             }
   //          }
   //          xhr.open('POST', loginForm.action, true);
   //          xhr.send(formData);
   //          event.target.reset();
   //       });
   // }

   const inputsPass = document.querySelectorAll('.input-password');
   if (inputsPass) {
      inputsPass.forEach(item => {
         const parentInput = item.closest('.inputBlock');
         const btnView = parentInput.querySelector('.view-password');
         btnView.addEventListener('click', (e) => {
            e.preventDefault();
            if (item.type == 'text') {
               item.type = 'password';
               btnView.classList.add('view-in');
            }
            else {
               item.type = 'text';
               btnView.classList.remove('view-in');
            }
         });
      })
   }
});

function initMap(map) {
   var myMap = new ymaps.Map(map, {
      center: [53.253729, 50.342774],
      zoom: 18,
   });

   myMap.geoObjects.add(new ymaps.Placemark([53.253729, 50.342774], {}, {
      iconLayout: 'default#image',
      iconImageHref: `${map.dataset.image}`,
      iconImageSize: [70, 96],
      iconImageOffset: [-35, -96]
   }));
}

function openFilter() {
   const filters = document.querySelectorAll(".j-filter-body");
   filters.forEach(filter => {
      filter.classList.add("opened");
      const table = filter.closest("table");
      if (table) {
         table.classList.add("filter-opened");
      }
   })

   document.body.classList.add("stop-scroll");
}

function closeFilter() {
   const filters = document.querySelectorAll(".j-filter-body");
   filters.forEach(filter => {
      filter.classList.remove("opened");

      const table = filter.closest("table");
      if (table) {
         table.classList.remove("filter-opened");
      }
   })

   document.body.classList.remove("stop-scroll");
}

function clearValue(event) {
   const target = event.target;
   const value = target.value;

   if (value.match(/[^0-9]/g)) {
      target.value = value.replace(/[^0-9]/g, "");
   }
}

function initSlider(slider, options) {
   if (!slider.classList.contains('swiper-container-initialized') && !slider.classList.contains('swiper-initialized')) {
      new Swiper(slider, options)
   }
}

function destroySlider(slider) {
   if (slider.classList.contains('swiper-container-initialized') || slider.classList.contains('swiper-initialized')) {
      slider.swiper.destroy()
   }
}