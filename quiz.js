document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('mlForm');
    var resultContainer = document.getElementById('resultContainer');

    function resetForm() {
        var radioButtons = form.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(function (radioButton) {
            radioButton.checked = false;
        });
        resultContainer.innerHTML = ''; 
    }

    var resetButton = form.querySelector('button[type="reset"]');
    resetButton.addEventListener('click', resetForm);

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.fade-in').forEach(section => {
        observer.observe(section);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    function validateQuestions() {
        let totalQuestions = 30; 
        for (let i = 1; i <= totalQuestions; i++) {
            let selectedOption = document.querySelector('input[name="optionsRadios'+i+'"]:checked');
            if (!selectedOption) {
                alert("Please attempt all questions before submitting.");
                return false;
            }
        }
        return true;
    }

    function calculateScore() {
        if (!validateQuestions()) {
            return; 
        }

        let totalQuestions = 30; 
        let correctAnswers = 0; 
        for (let i = 1; i <= totalQuestions; i++) {
            let selectedOption = document.querySelector('input[name="optionsRadios'+i+'"]:checked');
            if (selectedOption) {
                let selectedValue = selectedOption.value;
                if (selectedValue === 'option1') {
                    correctAnswers++;
                }
            }
        }

        let percentageScore = (correctAnswers / totalQuestions) * 100;

        resultContainer.innerHTML = "<p>Your percentage score is: " + percentageScore.toFixed(2) + "%</p>";
        if (percentageScore >= 70) {
            resultContainer.innerHTML += "<p>Congratulations! You are eligible for the Deep Learning course.</p>";
        } else {
            resultContainer.innerHTML += "<p>Your score is below 70%. Do you want to take the Machine Learning course again?</p>";
        }
    }

    var submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', calculateScore);

});
