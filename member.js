function skillsMember()
{
    var member = {
        name: "Shane",
        age: 27,
        skills: ["JavaScript", "HTML", "CSS"],
        displaySkills: function () {
            this.skills.forEach(function (skill) {
                console.log(skill);
            });
        }
    };
    member.displaySkills();
}