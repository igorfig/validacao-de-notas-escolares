const Events = {
    modalOverlay: document.querySelector('.modal-overlay'),
    home: document.querySelector('#home'),
    result: document.querySelector('.result-container'),

    open() {
        this.modalOverlay.classList.add("active");
        this.home.classList.add('hide');
        Form.clearFields();
    },

    close() {
        this.modalOverlay.classList.remove('active');
        
    },
    
    showHome() {
        this.home.classList.remove('hide');
        this.hideResult();
    },

    hideResult() {
        this.result.classList.add('hide');
    },

    showResult() {
        this.close();
        this.result.classList.remove('hide');
        this.home.classList.add('hide');

        const { name, media, classification } = Form.result();

        document.querySelector(".result-container .result").innerHTML = `
        Analisando a média de ${media} o aluno(a) ${name} está ${classification}
        `;

    },
}

const Form = {
    name: document.getElementById('name'),
    firstScore: document.getElementById('firstScore'),
    secondScore: document.getElementById('secondScore'),

    getValues(){
        return {
            name: Form.name.value,
            firstScore: Form.firstScore.value,
            secondScore: Form.secondScore.value,
        }
    },

    clearFields(){
        this.name.value = "";
        this.firstScore.value = "";
        this.secondScore.value = "";
    },

    result(score1, score2) {
        let { name, firstScore, secondScore } = this.getValues();

        score1 = Number(firstScore);
        score2 = Number(secondScore);

        let media = (score1 + score2) / 2;
        
        let classification;

        if(media < 3) {
            classification = 'reprovado(a)!';
        } 
        else if(media < 5.5) {
            classification = 'em recuperação!';
        }
        else if(media <= 10) {
            classification = 'aprovado(a)!';
        }

        return {
            name,
            media: media.toFixed(1),
            classification,
        }
    },
            
    submit(event){
        event.preventDefault();
        
        Events.showResult();

    }
}