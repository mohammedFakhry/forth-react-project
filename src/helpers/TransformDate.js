export default function TransformDate(date) {
    const selectData = new window.Date(date);

    const getFullYear = selectData.getFullYear();
    const getMonth = (selectData.getMonth() + 1).toString().padStart(2, '0');
    const getDay = selectData.getDate().toString().padStart(2, '0');

    return(`${getFullYear}-${getMonth}-${getDay}`);
    // return(`${getFullYear}/${getMonth}/${getDay}`);
};
