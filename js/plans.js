document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.getElementById("gallery");
    const addBtn = document.getElementById("addPlanBtn");
// tests



    function makeEditable(titleDiv) {
        let currentText = titleDiv.innerText;
        let input = document.createElement("input");
        input.type = "text";
        input.value = currentText;
        input.classList.add("plan-editor");

        titleDiv.innerHTML = "";
        titleDiv.appendChild(input);
        input.focus();

        input.addEventListener("blur", function () {
            titleDiv.innerText = this.value.trim() || currentText;
        });

        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                titleDiv.innerText = this.value.trim() || currentText;
            }
        });
    }

    function createPlanCard(title = "New Plan", imageSrc = "../images/placeholder.jpg") {
        const card = document.createElement("div");
        card.className = "plan-card";

        const img = document.createElement("img");
        img.src = imageSrc;
        img.alt = title;

        const titleDiv = document.createElement("div");
        titleDiv.className = "plan-title";
        titleDiv.innerText = title;
        titleDiv.addEventListener("click", () => makeEditable(titleDiv));

        const viewBtn = document.createElement("a");
        viewBtn.href = "#";
        viewBtn.className = "view-button";
        viewBtn.innerText = "View";

        const copyBtn = document.createElement("button");
        copyBtn.className = "copy-button";
        copyBtn.innerText = "Copy";
        copyBtn.addEventListener("click", () => {
            const beforeCount = document.querySelectorAll('.plan-card:not(.add-plan-card)').length;
            const originalTitle = titleDiv.innerText;
            const originalImgSrc = img.src;
        
            const copy = createPlanCard(originalTitle, originalImgSrc);
            gallery.insertBefore(copy, addBtn);
        
            setTimeout(() => {
                testCopyPlan(beforeCount, originalTitle, originalImgSrc);
            }, 50);
        });
        

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-button";
        deleteBtn.innerText = "X";
        deleteBtn.addEventListener("click", () => {
            const planName = titleDiv.innerText;
            const confirmDelete = confirm(`Would you like to delete the plan: "${planName}"?`);
            if (confirmDelete) {
                const beforeCount = document.querySelectorAll('.plan-card:not(.add-plan-card)').length;
                card.remove();
                setTimeout(() => {
                    testDeletePlan(beforeCount);
                }, 50);
            }
        });
        

        card.appendChild(img);
        card.appendChild(titleDiv);
        card.appendChild(viewBtn);
        card.appendChild(copyBtn);
        card.appendChild(deleteBtn);
        
        return card;
    }

    // Attach editable title and copy functionality to existing cards
    document.querySelectorAll(".plan-card").forEach((card) => {
        const titleDiv = card.querySelector(".plan-title");
        const img = card.querySelector("img");
        const copyBtn = card.querySelector(".copy-button");

        if (titleDiv && img && !card.classList.contains("add-plan-card")) {
            titleDiv.addEventListener("click", () => makeEditable(titleDiv));

            if (copyBtn) {
                copyBtn.addEventListener("click", () => {
                    const beforeCount = document.querySelectorAll('.plan-card:not(.add-plan-card)').length;
                    const originalTitle = titleDiv.innerText;
                    const originalImgSrc = img.src;
                
                    const copy = createPlanCard(originalTitle, originalImgSrc);
                    gallery.insertBefore(copy, addBtn);
                
                    setTimeout(() => {
                        testCopyPlan(beforeCount, originalTitle, originalImgSrc);
                    }, 50);
                });                
            }

            if (!card.querySelector(".delete-button")) {
                const deleteBtn = document.createElement("button");
                deleteBtn.className = "delete-button";
                deleteBtn.innerText = "❌";
                deleteBtn.addEventListener("click", () => {
                    const planName = titleDiv.innerText;
                    const confirmDelete = confirm(`Would you like to delete the plan: "${planName}"?`);
                    if (confirmDelete) {
                        const beforeCount = document.querySelectorAll('.plan-card:not(.add-plan-card)').length;
                        card.remove();
                        setTimeout(() => {
                            testDeletePlan(beforeCount);
                        }, 50);
                    }
                });
                
                card.appendChild(deleteBtn);
            }
        }
    });
    // Add new blank plan when + is clicked
    addBtn.addEventListener("click", () => {
    const beforeCount = document.querySelectorAll('.plan-card:not(.add-plan-card)').length;
    const newCard = createPlanCard();
    gallery.insertBefore(newCard, addBtn);

    setTimeout(() => {
        testAddPlan(beforeCount);
    }, 50);
    });

    //testing the add button for plans
    function testAddPlan(beforeCount) {
    const afterCount = document.querySelectorAll('.plan-card:not(.add-plan-card)').length;
    const newCard = document.querySelectorAll('.plan-card:not(.add-plan-card)')[afterCount - 1];

    const passed = afterCount === beforeCount + 1 && newCard.querySelector('.plan-title').innerText === "New Plan";
    console.log('[Test Add Plan]', passed ? '✅ Passed' : '❌ Failed');
    }
    //testing the copy button for plans
    function testCopyPlan(beforeCount, originalTitle, originalImgSrc) {
        const allCards = Array.from(document.querySelectorAll('.plan-card:not(.add-plan-card)'));
        const afterCount = allCards.length;
        const lastCard = allCards[allCards.length - 1]; // Most recent card
    
        const copiedTitle = lastCard.querySelector('.plan-title').innerText;
        const copiedImgSrc = lastCard.querySelector('img').src;
    
        const passed =
            afterCount === beforeCount + 1 &&
            copiedTitle === originalTitle &&
            copiedImgSrc === originalImgSrc;
    
        console.log(`[Test Copy Plan] Copied "${copiedTitle}":`, passed ? '✅ Passed' : '❌ Failed');
    }
    //testing the delete button for plans
    function testDeletePlan(beforeCount) {
        const afterCount = document.querySelectorAll('.plan-card:not(.add-plan-card)').length;
        const passed = afterCount === beforeCount - 1;
        console.log('[Test Delete Plan]', passed ? '✅ Passed' : '❌ Failed');
    }
    
    
    
});
