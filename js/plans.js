document.addEventListener("DOMContentLoaded", function () {
    // Select all elements with the class 'plan-title'
    document.querySelectorAll(".plan-title").forEach((title) => {
        title.addEventListener("click", function () {
            let currentText = this.innerText;
            let input = document.createElement("input");
            input.type = "text";
            input.value = currentText;
            input.classList.add("plan-editor");

            this.innerHTML = "";
            this.appendChild(input);
            input.focus();

            // Save changes when focus is lost
            input.addEventListener("blur", function () {
                title.innerText = this.value.trim() || currentText;
            });

            // Save changes when Enter key is pressed
            input.addEventListener("keypress", function (event) {
                if (event.key === "Enter") {
                    title.innerText = this.value.trim() || currentText;
                }
            });
        });
    });
});
