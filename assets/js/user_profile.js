$('.friend-request-button').click(function(e){
    e.preventDefault(); 
    $.ajax({
        type: 'POST',
        url: $('.friend-request-button').attr('href')
    })
    .done(function(data){
        new Noty({
            theme: 'metroui',
            text: "Request sent",
            type: 'success',
            layout: 'topLeft',
            timeout: 1500
            
        }).show();
        console.log(data);
    })
    .fail(function(errData){
        console.log('error in sending request: ',errData);
    })
});

$('.friend-request-accept-button').click(function(e){
    e.preventDefault();

    $.ajax({
        type: 'POST',
        url: $('.friend-request-accept-button').attr('href')
    })
    .done(function(data){
        new Noty({
            theme: 'metroui',
            text: "Request accepted",
            type: 'success',
            layout: 'topLeft',
            timeout: 1500
            
        }).show();
        console.log(data);
    })
    .fail(function(errData){
        console.log('error in accepting request: ',errData);
    });

    location.reload();
})