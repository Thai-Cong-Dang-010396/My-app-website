const $ = window.$;

const renderPreview = (dataPre) => {
    $(document).ready(function() {
        $("#preview").empty().append(dataPre);
    });
}

export default renderPreview;
