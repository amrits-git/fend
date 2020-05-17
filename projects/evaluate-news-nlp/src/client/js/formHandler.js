//import { validateURL } from './validateURL'

function handleSubmit(event) {
    event.preventDefault();

    
    let input_text = document.getElementById('input-text').value
    // if (!validateURL(url)) {
    //     console.log('URL is not valid');
    //     return;
    // }

    console.log("::: Form Submitted :::")
    fetch('//localhost:8081/sentiment-analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input_text })
    })
    .then(res => res.json())
    
    .then(function(res) {
        document.getElementById('nlp-text').innerHTML = res.text;
        document.getElementById('polarity').innerHTML = res.polarity;
        document.getElementById('polarity_confidence').innerHTML = res.polarity_confidence;
        document.getElementById('subjectivity').innerHTML = res.subjectivity;
        document.getElementById('subjectivity_confidence').innerHTML = res.subjectivity_confidence;
    })
}

export { handleSubmit }