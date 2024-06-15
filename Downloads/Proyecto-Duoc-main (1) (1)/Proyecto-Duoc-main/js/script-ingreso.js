document.querySelectorAll('.toggle-bar').forEach(function(toggleBar) {
    toggleBar.addEventListener('click', function() {
        var content = this.nextElementSibling;
        var icon = this.querySelector('.toggle-icon');
        if (content.style.display === 'none' || content.style.display === '') {
            content.style.display = 'block';
            icon.textContent = '-';
        } else {
            content.style.display = 'none';
            icon.textContent = '+';
        }
    });
});

/*Validacion CheckBox's*/
document.addEventListener('DOMContentLoaded', (event) => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', (event) => {
            const name = event.target.name;
            const checked = event.target.checked;
            
            checkboxes.forEach((cb) => {
                if (cb.name === name && cb !== event.target) {
                    cb.checked = false;
                }
            });
        });
    });
});
