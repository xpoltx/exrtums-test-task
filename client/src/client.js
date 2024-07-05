//~~~~~~api
const url = 'https://exrtums-test-task.onrender.com'

const fetchIdeas = async (path) => {
    try {
        const response = await fetch(path);
        const ideas = await response.json();
        return ideas;
    } catch (error) {
        console.error('Error getting ideas', error);
    }
}

const postIdeaSlider = async (ideaId) => {
    await fetch(`${url}/list`, {
        method: "POST",
        body: JSON.stringify({
            ideaId: ideaId
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}

const achieveIdea = async (ideaId) => {
    await fetch(`${url}/achieve`, {
        method: "PATCH",
        body: JSON.stringify({
            ideaId: ideaId
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}

const fetchStats = async () => {
    try {
        const response = await fetch(`${url}/stats`);
        const stats = await response.json();
        return stats;
    } catch (error) {
        console.error('Error fetching stats', error);
    }
}

const fetchCompletedIdeas = async() =>{
    try {
        const response = await fetch(`${url}/completed`);
        const completedIdeas = await response.json();
        return completedIdeas;
    } catch (error) {
        console.error(error)
    }
}


//~~~~ elements
const createIdeaCard = (idea) => {
    const ideaCard = document.createElement('div');
    ideaCard.classList.add('idea');
    ideaCard.innerHTML = `
        <div class="top">
            <h3>${idea.activity}</h3>
        </div>
        <div class="bottom">
            <p>${idea.type}</p>
        </div>
    `;
    ideaCard.dataset.id = idea._id;
    return ideaCard;
};

const createSliderIdeaCard = (idea) => {
    const sliderIdeaCard = document.createElement('div');
    sliderIdeaCard.classList.add('idea');
    sliderIdeaCard.innerHTML = `
        <div class="top">
            <h3>${idea.ideaId?.activity || 'No activity'}</h3>
        </div>
        <div class="bottom">
            <p>${idea.ideaId?.type || 'No type'}</p>
        </div>
    `;
    sliderIdeaCard.id = idea._id;
    return sliderIdeaCard;
};

const createTableRow = (idea, index) =>{
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
        <td class="index"></td>
        <td>${idea.ideaId.activity}</td>
        <td>${idea.ideaId.type}</td>
        <td>${idea.updatedAt}</td>
    `;
    return tableRow;
}

document.addEventListener('DOMContentLoaded', async () => {
    const pathForChooseSection = `${url}/ideas`;
    const pathForSlider = `${url}/slider`;
    const initialIdeas = await fetchIdeas(pathForChooseSection);

    const ideaGrid = document.querySelector('.idea-grid');

    let ideas = await fetchIdeas(pathForSlider);
    for (let i = 0; i < Math.min(initialIdeas.length, 4); i++) {
        let ideaCard = createIdeaCard(initialIdeas[i]);
        ideaCard.addEventListener('click', async () => {
            await postIdeaSlider(initialIdeas[i]._id);
            ideas = await fetchIdeas(pathForSlider);
            updateSlider();
        });
        ideaGrid.appendChild(ideaCard);
    }

    let currentIndex = 0;

    const ideasContainer = document.getElementById('ideas-container');
    const counter = document.getElementById('counter');

    const updateSlider = () => {
        ideasContainer.innerHTML = '';

        if (ideas.length === 0) {
            counter.textContent = `0/0`;
            return;
        }

        const prevIndex = (currentIndex === 0) ? ideas.length - 1 : currentIndex - 1;
        const nextIndex = (currentIndex === ideas.length - 1) ? 0 : currentIndex + 1;

        const prevIdea =createSliderIdeaCard(ideas[prevIndex]);
        prevIdea.classList.add('side');
        ideasContainer.appendChild(prevIdea);

        const currentIdea = createSliderIdeaCard(ideas[currentIndex]);
        currentIdea.classList.add('center');
        ideasContainer.appendChild(currentIdea);

        const nextIdea = createSliderIdeaCard(ideas[nextIndex]);
        nextIdea.classList.add('side');
        ideasContainer.appendChild(nextIdea);

        counter.textContent = `${currentIndex + 1}/${ideas.length}`;
        
    };

    document.getElementById('prev-btn').addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? ideas.length - 1 : currentIndex - 1;
        updateSlider();
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        currentIndex = (currentIndex === ideas.length - 1) ? 0 : currentIndex + 1;
        updateSlider();
    });

    const updateAchivements = async()=>{
        const res = await fetch(`${url}/stats`);
        const stats = await res.json();
        stats.forEach(stat => {
            const achievementElement = document.querySelector(`.achievement[data-type="${stat.type}"] .circle span`);
            if (achievementElement) {
                achievementElement.textContent = stat.count;
            }
        });

        const completedIdeas = await fetchCompletedIdeas();
        const tbody = document.querySelector('.completed tbody');
        tbody.innerHTML = '';

        completedIdeas.forEach((idea, index)=>{
            const tableRow = createTableRow(idea, index);
            tbody.appendChild(tableRow);
        });
    
    };

    const achieveBtn = document.querySelector('.achive-btn');
    achieveBtn.addEventListener('click', async() =>{
        let centerCard = document.querySelector('.center');
        if(centerCard){
            await achieveIdea(centerCard.id);
            centerCard.classList.add('achieved');
            updateAchivements();
            updateSlider();
        }
    });
    updateSlider();
    updateAchivements();


});


