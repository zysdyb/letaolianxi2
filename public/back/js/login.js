$(function () {

  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

     fields:{
       username:{
         validators:{
           notEmpty:{
             message:"用户名不能为空"
           },
           stringLength:{
             max: 6,
             min: 2,
             message:"用户名长度为2-6位" 
           },
           callback:{
             message:"用户名错误"
           }   
         }
       },

       password:{
        validators:{
          notEmpty:{
            message:"密码不能为空"
          },
          stringLength:{
            max: 12,
            min: 6,
            message:"密码长度为6-12位" 
          },   
          callback:{
            message: "密码错误"
          }
        }
       }

     }
  

  });

  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    
    $.ajax({
      type:"post", 
      url: "/employee/employeeLogin",
      data: $("#form").serialize(),
      dataType: "json",
      success:function(info){
        
        if (info.success) {
          location.href = "index.html"; 
        }
        if (info.error === 1000) {
          $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback");
        }
        if (info.error === 1001) {
          $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
        }
      }
    })

    
  });

  $('[type="reset"]').click(function(){
    $("#form").data('bootstrapValidator').resetForm(); 
  })
 

});