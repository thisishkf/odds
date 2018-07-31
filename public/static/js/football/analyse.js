$(document).ready(function () {
    $('#crs_table, #ttgo_table').find('tbody').find('tr')
        .each(function () {
            let _tr = $(this);
            let analyse = _tr.find('.analyse').html().trim();
            if (analyse != "") {
                _tr.css('background-color', '#C5EE98');
                if (analyse.indexOf('Lower') > -1) {
                    _tr.css('background-color', '#F8ED39');
                }
            }

        });
});


//af2c5ccc943efd15bfadaf48e200e4e1