// URL do JSON Server (alterar conforme necessário)
const API_URL_MOVIES = "http://localhost:3000/movies"; // API dos filmes
const API_URL_STUDENT = "http://localhost:3000/info"; // API do aluno

// Função para criar os cards dos filmes
function createMovieCard(movie) {
    return `
        <div class="col-md-4">
            <div class="card" style="max-width: auto; border-radius: 20px; background-color: #10002e; height: 100%;">
                <img src="${movie.image}" class="card-img-top" alt="${movie.title}" style="border-radius: 20px; max-height: 250px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title" style="color: aliceblue;">${movie.title}</h5>
                    <p class="card-text" style="color: aliceblue;">${movie.description}</p>
                    <p class="card-text" style="color: aliceblue;">Ano: ${movie.year}</p>
                </div>
            </div>
        </div>
    `;
}

// Função para criar o card do aluno (único)
function createStudentCard(info) {
    return `
        <div class="card-body  text-center" style="max-width: auto; border-radius: 20px; background-color: #10002e; height: 100%;">
            <h5 class="card-title" style="color: aliceblue;">Nome: ${info.nome}</h5>
            <p class="card-text" style="color: aliceblue;">Matrícula: ${info.matricula}</p>
            <p class="card-text" style="color: aliceblue;">Curso: ${info.curso}</p>
            <p class="card-text" style="color: aliceblue;">Turma: ${info.turma}</p>
        </div>
    `;
}

// Função para carregar os filmes
async function loadMovies() {
    try {
        const response = await fetch(API_URL_MOVIES);
        const movies = await response.json();

        const movieCards = movies.map(createMovieCard).join("");
        document.getElementById("movie-cards").innerHTML = movieCards;
    } catch (error) {
        console.error("Erro ao carregar os filmes:", error);
        document.getElementById("movie-cards").innerHTML = `<p class="text-danger">Erro ao carregar os dados.</p>`;
    }
}

// Função para carregar as informações do aluno
async function loadStudentInfo() {
    try {
        const response = await fetch(API_URL_STUDENT);
        const studentInfo = await response.json(); // Supondo que o JSON Server retorne um array ou um objeto

        // Verifique se é um array ou objeto e ajuste o acesso aos dados
        const student = Array.isArray(studentInfo) ? studentInfo[0] : studentInfo; // Caso seja um array, pegamos o primeiro aluno

        // Atualiza o conteúdo do card de identificação do aluno
        const studentCard = createStudentCard(student);
        document.getElementById("student-card").innerHTML = studentCard;
    } catch (error) {
        console.error("Erro ao carregar as informações do aluno:", error);
        document.getElementById("student-card").innerHTML = `<p class="text-danger">Erro ao carregar os dados.</p>`;
    }
}

// Chamar as funções para carregar os filmes e as informações do aluno
loadMovies();
loadStudentInfo();
