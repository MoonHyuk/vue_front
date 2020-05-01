function solution(skill, skill_trees) {
    var answer = 0;

    for(var i =0; i<skill_trees.length;i++){//주어진 배열마다 접근
        var check = new Array();

        for(var j=0;j<skill.length;j++){
            var index=27;
            for(var k=0;k<skill_trees[i].length;k++){
                if(skill[j]===skill_trees[i][k])
                    index=k+1;

            }
            check.push(index);

        }

        var tf=0;
        for(var j=0;j<check.length;j++) {//검증하는 부분

            var checkFrontBig=0;
            for(var k=0;k<j;k++){
                if(check[j]<check[k])
                    checkFrontBig++;
            }
            if(checkFrontBig!==0)
                tf++;
        }

        if(tf===0) {
            answer++;
        }
    }

    return answer;
}
console.log(solution("AB"	,["CDE", "RTG", "WEY","ACE","DEB"]	));