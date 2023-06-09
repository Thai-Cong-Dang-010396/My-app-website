import { marked } from 'marked';

marked.use({
    mangle: false,
    headerIds: false,
});

const $ = window.$;

const renderPreview = () => {
    $("#preview").empty();
    const valueEditor = $('#editor').prop('value');
    $("#preview").append(marked.parse(marked.parse(valueEditor)));
}

export default renderPreview;
