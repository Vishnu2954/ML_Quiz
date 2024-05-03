document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('mlForm');

    function resetForm() {
        var radioButtons = form.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(function (radioButton) {
            radioButton.checked = false;
        });
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

    var closeButton = document.querySelector('.modal-header .close');
    closeButton.addEventListener('click', function () {
        $('#exampleModalCenter').modal('hide');
    });

    var noButton = document.querySelector('.modal-footer .btn-secondary');
    noButton.addEventListener('click', function () {
        $('#exampleModalCenter').modal('hide');
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

        var modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = "<p>Your percentage score is: " + percentageScore.toFixed(2) + "%</p>";
        if (percentageScore >= 70) {
            modalBody.innerHTML += "<p>Congratulations! You have passed the quiz with flying colors!</p>";
            
        } else {
            modalBody.innerHTML += "<p>Oops! You need a minimum of 70% to pass the quiz.</p><br></br><p>Do you want to give it a one more try?</p>";
        }

        $('#exampleModalCenter').modal('show'); 
    }

    var submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', calculateScore);
});
