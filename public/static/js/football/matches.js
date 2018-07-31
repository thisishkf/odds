$(document).ready(function () {
    $('.anaylse_create').on('click', function () {
        let _btn = $(this);
        $("#anaylse_create_panel").find('input').each(function () {
            let _input = $(this);
            _input.val("");
        });

        $('#hkjc_id').val(_btn.closest('tr').attr('data-id'));
        $("#anaylse_create_panel").modal();
    });

    $('.anaylse_show').on('click', function () {
        let _btn = $(this);
        let hkjc_id = _btn.closest('tr').attr('data-id');
        let odds500_id = _btn.attr('data-odds');
        let wh_id = _btn.attr('data-wh');
        window.location.href = `/football/analyse/${hkjc_id}/${odds500_id}/${wh_id}`;
    });



    $('#analyse_init').on('click', function () {
        let _form = $('#anaylse_init_form');

        if (_form.find('#ODDS500_id').val() != null && _form.find('#wh_id').val() != null) {
            _form.submit();
        }
    });

    $('.all_odds').on('click', function () {
        let _btn = $(this);
        let hkjc_id = _btn.closest('tr').attr('data-id');
        window.location.href = `/football/data/${hkjc_id}`;
    });

});

//711595
//13192639