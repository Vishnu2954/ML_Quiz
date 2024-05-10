document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('mlForm');
    var resultContainer = document.getElementById('resultContainer');

       var syllabi = {
        'Beginner': 'To Learn: Numpy, Pandas, Matplotlib, Seaborn, SciKit-Learn, EDA, One-Hot Encoding, Supervised, Unsupervised & Reinforcement Learning',
        'Intermediate': 'To Learn: All ML Algorithms, Training & Testing, Hyperparameter Tuning, Evaluation Metrics, Regularization, Ensemble Learning',
        'Advanced': 'To Learn: Deep Learning, Model Deployment'
    };

    function submitForm(formDataObject) {
        fetch('/predict_proficiency', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataObject),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var predictedLevel = data.predicted_level;
            resultContainer.innerHTML = 'You are ' + predictedLevel + ' in Machine Learning!!!';
            if (syllabi.hasOwnProperty(predictedLevel)) {
                resultContainer.innerHTML += '<br>' + 'Recommended Syllabus: ' + syllabi[predictedLevel];
            }
        })
        .catch(error => console.error('Error:', error));
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

       var formDataObject = {
        'q1_not sure': mapRadioValue('optionsRadios1')['not sure'],
        'q1_yes': mapRadioValue('optionsRadios1')['yes'],
        'q2_not sure': mapRadioValue('optionsRadios2')['not sure'],
        'q2_yes': mapRadioValue('optionsRadios2')['yes'],
        'q3_not sure': mapRadioValue('optionsRadios3')['not sure'],
        'q3_yes': mapRadioValue('optionsRadios3')['yes'],
        'q4_not sure': mapRadioValue('optionsRadios4')['not sure'],
        'q4_yes': mapRadioValue('optionsRadios4')['yes'],
        'q5_not sure': mapRadioValue('optionsRadios5')['not sure'],
        'q5_yes': mapRadioValue('optionsRadios5')['yes']
    };


        submitForm(formDataObject);
    });

    function mapRadioValue(name) {
    var value = getRadioValue(name);
    if (value === 'option1') {
        return { 'not sure': 'zero', 'yes': 'one' };
    } else if (value === 'option2') {
        return { 'not sure': 'zero', 'yes': 'zero' };
    } else if (value === 'option3') {
        return { 'not sure': 'one', 'yes': 'zero' };
    }
    return null;
    }


    function getRadioValue(name) {
        var radios = form.elements[name];
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return radios[i].value;
            }
        }
        return null;
    }

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
});
     var themes = ['onyx', 'ebony', 'twilight', 'midnight', 'shadow'];
    var currentThemeIndex = -1;
    function toggleTheme() {
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            var theme = themes[currentThemeIndex];
            document.body.className = theme;
        }
