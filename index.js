/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

const freelancers = [];

function generateFreelancer() {
  const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
  const randomOccupation = OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)];
  const randomRate = Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min + 1)) + PRICE_RANGE.min;
  
  return {
    name: randomName,
    occupation: randomOccupation,
    rate: randomRate
  };
}

function calculateAverageRate(freelancersArray) {
  if (freelancersArray.length === 0) return 0;
  
  const total = freelancersArray.reduce((sum, freelancer) => sum + freelancer.rate, 0);
  return Math.round(total / freelancersArray.length);
}

function renderFreelancer(freelancer) {
  return `
    <div class="freelancer">
      <span class="name">${freelancer.name}</span>
      <span class="occupation">${freelancer.occupation}</span>
      <span class="rate">$${freelancer.rate}</span>
    </div>
  `;
}

function renderFreelancers(freelancersArray) {
  const freelancersList = freelancersArray.map(renderFreelancer).join('');
  
  return `
    <div class="freelancers-container">
      <div class="freelancer header">
        <span class="name">Name</span>
        <span class="occupation">Occupation</span>
        <span class="rate">Starting Price</span>
      </div>
      ${freelancersList}
    </div>`;
}

function renderAverageRate(average) {
  return `
    <div class="average-rate">
      <h2>The average rate is $${average}/hr</h2>
    </div>
  `;
}

function render() {
  const app = document.querySelector('#app');
  const average = calculateAverageRate(freelancers);
  
  app.innerHTML = `
    <h1>Freelancer Forum</h1>
    ${renderAverageRate(average)}
    ${renderFreelancers(freelancers)}
  `;
}

freelancers.push(generateFreelancer());
freelancers.push(generateFreelancer());

render();

const interval = setInterval(() => {
  if (freelancers.length >= NUM_FREELANCERS) {
    clearInterval(interval);
    return;
  }
  
  freelancers.push(generateFreelancer());
  render();
}, 500);