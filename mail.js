var clickConstSite = function(id) {
    this.body = $('body');
    this.id = id;
    

    this.mail = (function(self) {
        return {
            sendValid: function(e) {
                e.preventDefault();
            
                var 
                    form = $(this),
                    valid = true,
                    validField =  form.find('.valid').removeClass('error');

                validField.each(function() {
                    var eachSelf = $(this);
                    if(eachSelf.val() == '') {
                        valid = false;
                        eachSelf.addClass('error');
                    }
                });
                
                if(valid == false) { return false }

                var data = form.serialize();
               		data += "&formId=" +form.attr('id'); 

                $.post('/send-mail.php', data, function(responce) {
                    if(responce) {
                        setTimeout(function(){
							$('.thank-u').show();
						},800);
                        
                        form.find('input[type=text], textarea').val('');
                    };
                });  
            },

        }
    })(this);

    this.sendMail = this.body.on('submit', '#'+this.id, this.mail.sendValid);
}
