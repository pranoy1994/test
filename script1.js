/*
* Author : Ali Aboussebaba
* Email : bewebdeveloper@gmail.com
* Website : http://www.bewebdeveloper.com
* Subject : Crop photo using PHP and jQuery
*/

// the target size
var TARGET_W = 200;
var TARGET_H = 300;

// show loader while uploading photo
function submit_photo() {
    
    
    if ($('#photo').val() == '') {
alert('No photo was selected!');
return false;
};
    
    $('#loading_progress').show();
	// display the loading texte
	$('#loading_progress').html('<img src="images/loader.gif"> Uploading your photo...');
}

function upload_error() {
// hide the popup
$('#popup_upload').hide();
// $('#loading_progress').hide();
alert('invalid image format');
// return false;
}

// show_popup : show the popup
function show_popup(id) {
	// show the popup
	
	$('#'+id).show();



}

// close_popup : close the popup
function close_popup(id) {
	// hide the popup
	$('#'+id).hide();
}
var myurl='';

// show_popup_crop : show the crop popup
function show_popup_crop(url) {
	// change the photo source
	try {
		// jcrop_api.destroy();
		$('#cropbox').slim('destroy');
		
	} catch (e) {
		// object not defined
	}
	//cropper.edit();
	
		$('#cropbox').attr('src', url);
		


		$('#cropbox').slim({
			// ratio: '1:1',
			push: true,
			service:  'slim_croper_service.php',
			minSize: {
		    	width: 400,
		        height: 540,
		    }
/*		     willSave: function(data, ready) {
		        // alert('saving!');
		        ready(data);
		    }*/
		});
		myurl = url;
			
		// $('#cropbox').slim('size', {width: 400, height: 540});
	
		// $('#cropbox').load(url);

	// destroy the Jcrop object to create a new one
	
	// Initialize the Jcrop using the TARGET_W and TARGET_H that initialized before
    /*$('#cropbox').Jcrop({
      aspectRatio: TARGET_W / TARGET_H,
      setSelect:   [ 100, 100, TARGET_W, TARGET_H ],
      onSelect: updateCoords,
        
    },function(){
        jcrop_api = this;
    });*/

    

    // store the current uploaded photo url in a hidden input to use it later
	$('#photo_url').val(url);
	// hide and reset the upload popup
	$('#popup_upload').hide();
	$('#loading_progress').html('');
	$('#photo').val('');

	// show the crop popup
	$('#popup_crop').show();
	
	
	setTimeout(function(){ 
	$('#cropbox').slim('edit');
	console.log($('#cropbox').slim('edit')); 
	}, 3000);
	
}

// crop_photo : 
function crop_photo() {
	// var x_ = $('#x').val();
	// var y_ = $('#y').val();
	// var w_ = $('#w').val();
	// var h_ = $('#h').val();
	// var photo_url_ = $('#photo_url').val();

	//var slim_data1 = $("input[name='slim[]']").val();

		var sname = $("input[name='sname']").val();

	var aname = $("input[name='aname']").val();
		var title = $("input[name='title']").val();
			var email = $("input[name='email']").val();
				var phone = $("input[name='phone']").val();


	var slim_data2= "myvalue="+ myurl + "&sname="+ sname +"&title="+ title +"&email="+ email +"&aname="+ aname +"&phone="+ phone +"&tempid="+ temp_id +"";
	// hide thecrop  popup
	$('#popup_crop').hide();

	// display the loading texte
	$('#photo_container').html('<img src="images/loader.gif"> Processing...');
	// crop photo with a php file using ajax call
	$.ajax({
		url: 'crop_photo.php',
		// url: 'upload_photo1.php',
		type: 'POST',
		data: slim_data2,
		success:function(data){
			window.location = 'gallery1.php?id='+data;
			$('#photo_container').html(data);
		}
        	});
    
}
function updateCoords(c) {
	// $('#x').val(c.x);
	// $('#y').val(c.y);
	// $('#w').val(c.w);
	// $('#h').val(c.h);
}