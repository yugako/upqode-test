!function(t){var e,n={url:"mail/sendmail.php",reset:!0,freeze:0},a=function(t,e){this.form=t,this.init(e)},r=a.prototype;r.init=function(a){var r=this,i=t(r.form);!0!==r.inited&&"FORM"==r.form.tagName&&(r.defaults=t.extend(!0,{},n,t.fn.sendMail.defaults),r.options=a||{},r.dataOptions=i.data("sendmail")||{},r.settings=t.extend(!0,{},r.defaults,r.options,r.dataOptions),i.trigger("beforeInit.sml",[r,r.form]),r.nsid=e.getRndNum(1e4,99999),r.stop=!1,i.addClass("sendmail-form").on("submit.sml-"+r.nsid,function(){return r.send.call(r),!1}),r.inited=!0,i.trigger("afterInit.sml",[r,r.form]))},r.send=function(){var e=this,n=e.form,a=t(n),r=e.settings;if(e.inited&&!e.stop){if(e.stop=!0,a.trigger("beforeSend.sml",[e,e.form]),a.find('input[type="file"]').length)(i={data:new FormData(n),ajaxProcData:!1,ajaxContType:!1}).data.append("js","on"),e.addData&&t.each(e.addData,function(t,e){i.data.append(t,e)}),window.FormData||a.off("submit.sml-"+e.nsid).trigger("submit");else{var i={data:a.serialize()+"&js=on",ajaxProcData:!0,ajaxContType:"application/x-www-form-urlencoded; charset=UTF-8"};e.addData&&(i.data+="&"+t.param(e.addData))}t.ajax({type:"POST",url:r.url,data:i.data,processData:i.ajaxProcData,contentType:i.ajaxContType,success:function(t,n,i){1==i.getResponseHeader("sendmail")?(e.pullFreeze(),a.trigger("success.sml",[e,e.form,t]),r.reset&&a.trigger("reset")):a.trigger("serverError.sml",[e,e.form,t]),a.trigger("afterSend.sml",[e,e.form,t])},error:function(t){e.pullFreeze(),a.trigger("afterSend.sml",[e,e.form,t]),a.trigger("ajaxError.sml",[e,e.form,t])}})}},r.pullFreeze=function(t){var e=this;setTimeout(function(){e.stop=!1},t||this.settings.freeze)},r.destroy=function(){var e=this,n=e.form;e.inited&&(t(n).removeClass("sendmail-form").off("submit.sml-"+e.nsid),delete n.SendMail)},r.reinit=function(e){var n=this,a=t(n.form),r="object"==typeof e&&0!=Object.keys(e).length?e:t.extend(!0,{},n.settings);n.destroy(),a.sendMail(r)},e={getRndNum:function(t,e){return Math.round(t-.5+Math.random()*(e-t+1))}},t.fn.sendMail=function(){function e(t,e,n){if(t[r]instanceof a&&e in t[r])return t[r][e].apply(t[r],Array.prototype.slice.call(n,1))}function n(t,e){if(!(t[r]instanceof a))return new a(t,e)}var r="SendMail",i=arguments,s=i[0];return t.each(this,function(t,a){"object"==typeof s||void 0===s?a[r]=n(a,s):"init"===s||"reinit"===s?a[r]?e(a,s,i):a[r]=n(a,i[1]):e(a,s,i)}),this},t.fn.sendMail.prototype=a.prototype,t.fn.sendMail.defaults=n}(jQuery);