const dropDown = document.querySelector('.dropdown');
const dropDownContent = document.querySelector('.dropdown-content');


dropDown.addEventListener('click', function () {
    // dropDownContent.style.top = '8vh';
    if (dropDownContent.style.display === 'block') {
        dropDownContent.style.display = 'none';
        return;
    }
    dropDownContent.style.display = 'block';

});

function closeDropDown() {
    dropDownContent.style.display = 'none';

};