/**
 * http://usejsdoc.org/
 */
$(function() {
	$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
		_title : function(title) {
			var $title = this.options.title || '&nbsp;'
			if (("title_html" in this.options)
					&& this.options.title_html == true)
				title.html($title);
			else
				title.text($title);
		}
	}));
	var addFormValidator = $('#add-shift-form').validate(
			{
				errorElement : 'div',
				errorClass : 'help-block',
				focusInvalid : true,
				rules : {
					shilfName : {
						required : true,
						minlength : 3,
						maxlength : 10,
						remote : {
							type : "POST",
							url : "/shelfs/validate-name"
						}
					}
				},
				messages : {
					shilfName : {
						required : '请填写书架名称.',
						minlength : '名称过短',
						maxlength : '名称过长',
						remote : '该名称已经使用'
					}
				},

				invalidHandler : function(event, validator) { // display error
																// alert on form
																// submit

				},

				highlight : function(e) {
					$(e).closest('.form-group').removeClass('has-info')
							.addClass('has-error');
				},

				success : function(e) {
					$(e).closest('.form-group').removeClass('has-error')
							.addClass('has-info');
					$(e).remove();
				},

				errorPlacement : function(error, element) {
					error.insertAfter(element.parent());
				},

				submitHandler : function(form) {
				},
				invalidHandler : function(form) {
				}
			});

	var saveShilft = function(dialog) {
		var shilfName = $('#shilfName').val();
		$.post("/shelfs/new", {
			"shilfName" : shilfName
		}, function(data) {
			if (data.success) {
				dialog.dialog("close");
			} else {
				
			}
		}, "json");
	};
	$('#add-shelft')
			.click(
					function(e) {
						e.preventDefault();
						$('#add-shift-form')[0].reset();
						addFormValidator.resetForm();
						var dialog = $("#dialog-add")
								.removeClass('hide')
								.dialog(
										{
											modal : true,
											width : '55rem',
											title : "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='icon-edit'></i> 新增书架</h4></div>",
											title_html : true,
											buttons : [
													{
														text : "取消",
														"class" : "btn btn-xs",
														click : function() {
															$(this).dialog("close");
														}
													},
													{
														text : "保存",
														"class" : "btn btn-primary btn-xs",
														click : function() {
															if ($(
																	'#add-shift-form')
																	.valid()) {
																saveShilft($(this));
															}
														}
													} ]
										});

					});
});