## About The Project

Sample questions for sailing exam at ANR are available in PDF format.
Project aims to create a dynamic experience on training yourself with
the provided questions on the [Romanian Naval Authority](https://portal.rna.ro/servicii/personal-navigant) website.

Note: actual data is not added to this git repo here, as I have no intellectual
property for it. Sample data is provided with just a few questions.

### Installation

Manually prepare your .txt data from their pdf-s in `data/`. See the sample ones
in `sample.data/`. You must respect the four filenames. Just place the four
txt-s in `data/`. Then run

    npm i                # d'oh
    npm run convert-data # generates .json question sets
    npm start            # builds and starts frontend app

### Built With

- [node](https://nextjs.org/), you may need at least version 18
- [lit](https://lit.dev/)

### How the project can continue
As I was in rush to actually study for the exam, there are
a few features I wish this project had:

 * create separate views for the four categories which requires ..
 * .. adding a router
 * paginate questionnaire or offer the option to ..
 * .. train on a subset
