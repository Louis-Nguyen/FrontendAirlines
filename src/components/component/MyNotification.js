import '../../resource/bootstrap-notify.min.js';
import $ from 'jquery';
class MyNotification {

    handleStyle = { 
        template : '<div data-notify="container"  class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +            
            '<p data-notify="message">{2}</p>' +                         
            '</div>' , 
        animate  : {
                enter: 'animated zoomIn',
                exit: 'animated zoomOut'
        }
    }
    showNotify=(message,type)=>{
        $.notify({
                message
            }, 
            {
                type: type,
                allow_dismiss: true,
                placement:{from:'top', align:'right'},
                offset: 20,
                spacing: 10,
                z_index: 1031,
                delay: 2000,
                timer: 50,
                url_target: '_blank',
                mouse_over: 'pause',
                animate: this.handleStyle.animate,
                onShow: null,
                onShown: null,
                onClose: null,
                onClosed: null,
                icon_type: 'class',
                template: this.handleStyle.template
            }
        )
    }
    alertWarning = (message, type) => {
      
        this.showNotify(message,'warning')
    }
    alertSuccess = (message, action_name) => {
        this.showNotify(message,'success')  
    }
    alertError = (message, action_name) => {
        this.showNotify(message,'danger')                            
    }

    
}
export default new MyNotification