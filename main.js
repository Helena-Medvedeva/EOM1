document.addEventListener("DOMContentLoaded", () => {

    //кнопка вверх
    const btnTop = document.getElementById("toTop");

    if (btnTop) {
        window.addEventListener("scroll", () => {
            btnTop.style.display = window.scrollY > 300 ? "block" : "none";
        });

        btnTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    //поиск по глосарию
    const glossaryInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const glossaryCards = document.querySelectorAll(".term-card");

    function normalize(text) {
        return text.toLowerCase().trim();
    }

    function runSearch() {
        if (!glossaryInput) return;

        const value = normalize(glossaryInput.value);

        glossaryCards.forEach(card => {
            const title = normalize(card.querySelector("h2").textContent);
            const text = normalize(card.querySelector("p").textContent);

            const match =
                title.includes(value) ||
                text.includes(value);

            card.style.display = (match || value === "") ? "block" : "none";
        });
    }

    if (glossaryInput && searchBtn) {
        searchBtn.addEventListener("click", runSearch);

        glossaryInput.addEventListener("input", runSearch);

        glossaryInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                runSearch();
            }
        });
    }

    //тема 
    const toggleBtn = document.getElementById("themeToggle");

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-theme");

        if (toggleBtn) {
            toggleBtn.textContent = "☀️";
        }
    }

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {

            document.body.classList.toggle("light-theme");

            const isLight =
                document.body.classList.contains("light-theme");

            localStorage.setItem(
                "theme",
                isLight ? "light" : "dark"
            );

            toggleBtn.textContent = isLight ? "☀️" : "🌙";
        });
    }

    //глосарий фильтр по буквам
    const letters = document.querySelectorAll("[data-letter]");

    letters.forEach(btn => {

        btn.addEventListener("click", () => {

            const letter = btn.dataset.letter;

            glossaryCards.forEach(card => {

                const title =
                    card.querySelector("h2").textContent.trim();

                if (letter === "all") {
                    card.style.display = "block";
                } else {
                    card.style.display =
                        title.startsWith(letter)
                            ? "block"
                            : "none";
                }

            });

        });

    });

    //поиск гугл
    const googleForm = document.getElementById("googleSearch");
    const googleInput = document.getElementById("search");

    if (googleForm && googleInput) {

        googleForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const query = googleInput.value.trim();

            if (!query) return;

            const googleUrl =
                "https://www.google.com/search?q=" +
                encodeURIComponent(query);

            window.open(googleUrl, "_blank");

        });

    }

});