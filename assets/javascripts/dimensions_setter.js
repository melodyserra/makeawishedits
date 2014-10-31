var widget = uploadcare.Widget('[role=uploadcare-uploader]'),
	$imageWidthInput = $('#imageWidthInput'),
	$imageHeightInput = $('#imageHeightInput');


widget.onUploadComplete(function(info) {
	$imageWidthInput.val(info.originalImageInfo.width);
	$imageHeightInput.val(info.originalImageInfo.height);
});