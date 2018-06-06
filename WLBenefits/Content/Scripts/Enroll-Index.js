$(function () {
    // temporary 
    initDragAndDrop();
});



function initDragAndDrop() {
    $(".col-4 .plans:not(.plan-disabled)").draggable({
        snap: ".plan-placeholder",
        helper: "clone",
        start: function () {
            $('#Instructions, #Arrow').toggleClass('hide', true);
            $('.plan-placeholder.open:first()').toggleClass('dashed', true);
            $(".plan-placeholder.open:first()").droppable({
                drop: function (event, ui) {
                    $('#Instructions, #Arrow').remove();
                    var html = $(ui.draggable).clone();
                    $(this).removeClass('open');
                    $(ui.draggable).toggleClass('plan-disabled', true);
                    window.setTimeout(function () {
                        $(ui.draggable).draggable("destroy");
                        $('.engraved .plans').draggable({
                            start: function (event, ui) {
                                $(this).parent().addClass('open');
                            },
                            stop: function (event, ui) {
                                var id = $(this).data().id;
                                $(".col-4 [data-id='" + id + "']").removeClass("plan-disabled");
                                $(this).remove();
                                initDragAndDrop();
                            }
                        });
                    }, 1000);
                    $(this).removeClass('dashed');
                    $(this).append(html);
                }
            });
        },
        drag: function () {
        },
        stop: function () {
            $('#Instructions, #Arrow').toggleClass('hide', false);
            $('.plan-placeholder').toggleClass('dashed', false);
        }
    });
}
