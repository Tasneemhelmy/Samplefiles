const fs=require('fs');
const student=JSON.parse(fs.readFileSync("student.json"));
const course=JSON.parse(fs.readFileSync("course.json"));
const department=JSON.parse(fs.readFileSync("department.json"));


const http=require('http');
server=http.createServer((req,res)=>{
    ///API of student
    const {method,url}=req;
    if(method=="GET" && url=="/student"){
        console.log("2- GetAll students")
        res.end(JSON.stringify(student));
    }else if(method=='GET' && url=='/details'){
        let resStudent=student.map((el)=>{
            let courses=course.filter((cos)=>cos.DepartmentId==el.DepId)
            return{...el,courses};
        });
        console.log('3- Get all students with theirdepartment and coursesrelated to the department')
        res.end(JSON.stringify(resStudent));
            
    }
    else if(method=='GET' &&  url.startsWith("/student/") ){ 
        const idurl=url.split('/')[2];
        let index=student.findIndex(element=>element.id==idurl)
        console.log('6- search for a student by ID');
        res.end(JSON.stringify(student[index]));
    }
    else if(method=="POST" && url=="/addStudent"){    
        req.on('data',(chunk)=>{
            const data=JSON.parse(chunk);
            data.id=student[student.length-1].id+1 ;
            student.push(data);
            const newdata=JSON.stringify(student)
            fs.writeFileSync("student.json",newdata,"utf8");
            console.log('1- Add student')
            res.end(JSON.stringify(student));
        });
    }else if(method=='PATCH' && url.startsWith("/student/")){
        const idurl=url.split('/')[2];
        let index=student.findIndex(element=>element.id==idurl)
    console.log( index);
    req.on('data',(chunk)=>{
        const data=JSON.parse(chunk);
        let {name,email}=data;
        student[index].name=name;
        student[index].email=email
        const ubdatData=JSON.stringify(student)
            fs.writeFileSync("student.json",ubdatData,"utf8");
        console.log('5- update student');
        res.end(JSON.stringify(student));
    });
    }else if(method=='DELETE' && url.startsWith("/student/")){
        const idurl=url.split('/')[2];
        let index=student.findIndex(element=>element.id==idurl)
        student.splice(index,1);
        const deleteData=JSON.stringify(student)
            fs.writeFileSync("student.json",deleteData,"utf8");
        console.log('4- delete student');
        res.end(JSON.stringify(student));
    
    }
//////////////////////////////////////////////////////////////////////////////////////////////


    //API of course
    else if(method=='GET' && url=='/course'){
        res.end(JSON.stringify(course))
        console.log('4- Get all courses')
    }
    else if(method=="POST" && url=="/addCourse"){
        req.on('data',(chunk)=>{
            const data=JSON.parse(chunk);
            data.id=course[course.length-1].id+1 ;
            course.push(data);
            const newdata=JSON.stringify(course)
            fs.writeFileSync("course.json",newdata,"utf8");
            console.log('1-Add courses')
            res.end(JSON.stringify(course));
        });
    }
    else if(method=='PATCH' && url.startsWith("/course/")){
        const idurl=url.split('/')[2];
        let index=course.findIndex(element=>element.id==idurl)
        req.on('data',(chunk)=>{
        const data=JSON.parse(chunk);
        let {name,Content}=data;
        course[index].name=name;
        course[index].Content=Content;
        const ubdatData=JSON.stringify(course)
            fs.writeFileSync("course.json",ubdatData,"utf8");
        console.log('3- update course');
        res.end(JSON.stringify(course));
    });
}
else if(method=='DELETE' && url.startsWith("/course/")){
    const idurl=url.split('/')[2];
    let index=course.findIndex(element=>element.id==idurl)
    course.splice(index,1);
    const deleteData=JSON.stringify(course)
        fs.writeFileSync("course.json",deleteData,"utf8");
    console.log('2- delete course');
    res.end(JSON.stringify(course));

}
else if(method=='GET' &&  url.startsWith("/course/") ){
    const idurl=url.split('/')[2];
    let index=course.findIndex(element=>element.id==idurl)
    console.log('5- Get specific course byId');
    res.end(JSON.stringify(course[index]));
}
/////////////////////////////////////////////////////////////////////////////////////////


///API of department
else if(method=='GET' && url=='/department'){
    res.end(JSON.stringify(department))
    console.log('4- Get all departments')
}
else if(method=="POST" && url=="/addDepartment"){
    req.on('data',(chunk)=>{
        const data=JSON.parse(chunk);
        data.id=department[department.length-1].id+1 ;
        department.push(data);
        const newdata=JSON.stringify(department)
        fs.writeFileSync("department.json",newdata,"utf8");
        console.log('1- Add department')
        res.end(JSON.stringify(department));
    });
}
else if(method=='PATCH' && url.startsWith("/department/")){
    const idurl=url.split('/')[2];
    let index=department.findIndex(element=>element.id==idurl)
req.on('data',(chunk)=>{
    const data=JSON.parse(chunk);
    let {name}=data;
    department[index].name=name;
    const ubdatData=JSON.stringify(department)
        fs.writeFileSync("department.json",ubdatData,"utf8");
    console.log('2- Update department');
    res.end(JSON.stringify(department));
});
}
else if(method=='DELETE' && url.startsWith("/department/")){
const idurl=url.split('/')[2];
let index=department.findIndex(element=>element.id==idurl)
department.splice(index,1);
const deleteData=JSON.stringify(department)
    fs.writeFileSync("department.json",deleteData,"utf8");
console.log('3- Delete department');
res.end(JSON.stringify(department));

}
else if(method=='GET' &&  url.startsWith("/department/") ){
const idurl=url.split('/')[2];
let index=department.findIndex(element=>element.id==idurl)
console.log('5- Get specific departmentby Id');
res.end(JSON.stringify(department[index]));
}
    
    else{
        res.end(JSON.stringify({message:"not found"}));
    }
});
server.listen(3000,'127.0.0.2',(error)=>{
    if(error){
        console.log('error')
    }else{
        console.log("server running"); 
    }
})

