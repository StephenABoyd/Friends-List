# Friends List

---

### This project was made with:
- [Angular 12](https://angular.io/)
- [NgRx](https://ngrx.io/)
- [D3](https://www.npmjs.com/package/d3)
- [Jest](https://www.npmjs.com/package/jest)
- [Angular Material](https://material.angular.io/)
- [Nx (Nrwl)](https://nx.dev/)
- [Cypress](https://www.cypress.io/)

---

### How to run
1. `npm i`
2. `ng serve`
3. Go to [localhost:4200](http://localhost:4200)

---

### What does this project do?
This project maintains a list of friends and contains 2 graphs displaying information about your friends ages.

#### Friends
 - Add Friends
    - Each friend contains `name`, `age`, `weight` and `friends`
 - Update Friends
 - Delete friends
 - Maintains a list of all previous added friends, to autocomplete future friends of friends

  ![Edit Friend](./assets/Edit-Friend.png)

#### Graphs
  - Graph 1 is a bar graph that charts the age of each of your friends
  - Graph 2 is a line graph that shows age ranges and how many friends you have in each range

  ![Graphs](./assets/Graphs.png)
