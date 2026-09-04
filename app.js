const api="https://leetcode-api-pied.vercel.app/problems";
const topicSelect=document.querySelector('select[name="topic"]');
const subtopicSelect=document.querySelector('select[name="subtopic"]');
const btn=document.querySelector("#suggest-btn");
const diff=document.querySelector('select[name="difficulty"]');
const suggbox=document.querySelector(".suggestion-box");

for (let i in topics) {
    let topic = document.createElement("option");
    topic.innerText = i;
    topic.value = i;
    topicSelect.append(topic);

}
topicSelect.addEventListener("change", () => {
    subtopicSelect.innerHTML = `<option value="" disabled selected hidden>--select--</option>`;
    for (let j of topics[topicSelect.value]) {
        let subtopic = document.createElement("option");
        subtopic.innerText = j;
        subtopic.value = j;
        subtopicSelect.append(subtopic);
    }
});
btn.addEventListener("click", async () => {
    let data;
    try {
        let response = await fetch(api);
        data = await response.json();
    }
    catch {
        suggbox.innerHTML = "API ma vandho che bhai";
    }
    let filtered = data.filter(problem =>
        (diff.value === "" || problem.difficulty === diff.value)
        && (subtopicSelect.value === "" || problem.topic_tags.includes(subtopicSelect.value))
    );
    if (filtered.length === 0) {
        suggbox.innerHTML = "Not Exist";
        return;
    }
    suggbox.innerHTML = "";
    let cnt = 0;
    for (let que of filtered) {
        if (cnt === 50) break;
        let link = document.createElement("a");
        link.innerText = `${que.id}. ${que.title}`;
        link.href = que.url;
        link.target = "_blank";
        cnt++;
        suggbox.append(link);
    }
});
