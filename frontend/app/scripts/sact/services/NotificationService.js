angular.module('sact').service('NotificationService', function() {

    var notify = function(title, message, level) {
        var notice = new PNotify({
            title: title,
            text: message,
            type: level,
            icon: false,
            buttons: {
                closer: false,
                sticker: false
            }
        });
        notice.get().click(function() {
            notice.remove();
        });
    };

    return {
        success: function(title, message){ notify(title, message, 'success')},
        warning: function(title, message){ notify(title, message, 'warning')},
        error: function(title, message){ notify(title, message, 'error')}
    };
});
