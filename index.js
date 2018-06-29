function getRepositories(){
  var username = document.getElementById('username').value;
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  var url = 'https://api.github.com/users/' + username + '/repos';
  req.open("GET", url);
  req.send();
}

function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>'+'<strong>' + r.name + '</strong>' + '    ' + r.html_url + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const repoName = el.dataset.repo
  const username = el.dataset.owner.login
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/'+ username +'/' + repoName + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  console.log(commits)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}