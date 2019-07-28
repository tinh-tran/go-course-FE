import React, {Component} from 'react';
import {DataTable} from 'primereact/datatable';
import {FileUpload} from 'primereact/fileupload';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { connect } from "react-redux";
import { fetchCourses, saveCourse } from "../services/CourseService";
import { uploadImage } from "../services/ImageService";
import { bindActionCreators } from 'redux';
import {Button} from 'primereact/button';
import Input from 'react-validation/build/input';
import { isEmpty } from 'validator';
import Form from 'react-validation/build/form';
import CheckButton from 'react-validation/build/button';
import {Calendar} from 'primereact/calendar';
import {Dropdown} from 'primereact/dropdown';
const axios = require("axios");

class NewCourse extends React.Component {
	constructor(props) {
        super(props);
		console.log("props",this.props.course)
        this.state = {
            value: null,
            date:null,
			value1: this.props.course ? this.props.course.CourseName : "",
            value2: this.props.course ? this.props.course.CategoryID : "",
            value3: this.props.course ? this.props.course.CourseDescription : "",
            value4: this.props.course ? this.props.course.CoursePrice : "",
            value5: this.props.course ? this.props.course.StartDate : "",
            value6: this.props.course ? this.props.course.EndDate : "",
            value7: this.props.course ? this.props.course.SlotAvailable : "",
            value8: this.props.course ? this.props.course.SlotRegistered : "",
            value9: this.props.course ? this.props.course.CourseImage : "",
			selectedFile: null
        };
		this.props.image.imageName = this.props.course ? this.props.course.CourseImage : "";
        this.saveHandle = this.saveHandle.bind(this);
    }
    
    saveHandle(e) {
        e.preventDefault();
        this.form.validateAll();
        if ( this.checkBtn.context._errors.length === 0 ) {
                var CourseName = this.state.value1
                var CategoryID = parseInt(this.state.value2)
                var CourseDescription = this.state.value3
                var CoursePrice = parseInt(this.state.value4)
                var StartDate = this.state.value5
                var EndDate = this.state.value6
                var SlotAvailable = parseInt(this.state.value7)
                var SlotRegistered =parseInt(this.state.value8) 
                var CourseImage = this.props.image.imageName
                var CourseId = this.props.course ? this.props.course.CourseId : 0
				console.log("CourseID " , CourseId)
                var course =	JSON.stringify({CourseId,CourseName,CategoryID,CourseDescription,CoursePrice,CourseImage,StartDate,EndDate,SlotAvailable,SlotRegistered})
                this.props.dispatch(saveCourse(course));
                console.log(JSON.stringify(course))
                this.state.value1 = "";
                this.state.value2 = "";
                this.state.value3 = "";
                this.state.value5 = "";
                this.state.value6 = "";
                this.state.value7 = "";
                this.state.value8 = "";
        }
        this.props.onClose()
    }
	fileChangedHandler = (event) => {
	  //this.uploadHandler( event.target.files[0])
	  this.props.dispatch(uploadImage(event.target.files[0],"course"));
	}
	onDragEnter(e) {
        this.setState({ active: true });
    }
    
    onDragLeave(e) {
        this.setState({ active: false });
    }
    
    onDragOver(e) { 
        e.preventDefault(); 
    }
    
    onDrop(e) {
        e.preventDefault();
        this.setState({ active: false });
        this.onFileChange(e, e.dataTransfer.files[0]);
    }
    getImgLink = (imgname) => {
		if (imgname){
			var n = imgname.indexOf("://www");
			console.log(imgname);
			if(n > 0)
				return imgname;
			return "/images/course/"+ imgname;
		}
	}
	
    onFileChange(e, file) {
        var file = file || e.target.files[0],
            pattern = /image-*/,
            reader = new FileReader();
            
        if (!file.type.match(pattern)) {
            alert('S3');
            return;
        }
        
        this.setState({ loaded: false });
        
        reader.onload = (e) => {
            this.setState({ 
                imageSrc: reader.result, 
                loaded: true 
            }); 
        }
    }
    render() {   
        let state = this.state,
        props = this.props,
        labelClass  = `uploader ${this.props.image.imageName && 'loaded'}`,
        borderColor = state.active ? props.activeColor : props.baseColor,
        iconColor   = state.active 
            ? props.activeColor
            : (state.loaded) 
                ? props.overlayColor 
                : props.baseColor;

        const required = (value) => {
            if (isEmpty(value)) {
                return <small className="form-text text-danger">This field is required</small>;
            }
          }
        const minLength = (value) => {
            if (value.trim().length < 1) {
                return <small className="form-text text-danger">Password must be at least 1 characters long</small>;
            }
          }

          
        return (
            <div class="Form-Actions">
				<div className="content-section">
                <Form onSubmit={e => this.saveHandle(e)} ref={c => { this.form = c }} style={{width: '800px'}}>
					<h1 style={{ textAlign: 'center' }}>Update Form</h1>
					<hr/>
                    <div className="padding-right">
                    Course Name
                    <Input 
                        name="name"
						value={this.state.value1}						
                        onChange={(e) => this.setState({value1: e.target.value})}
                        type="text" 
                        placeholder="Course Name"
                        className="form-control" 
                        validations={[required, minLength]}
                    />
                    Category ID
                        <Input 
                        name="des"
						value={this.state.value2}					
                        onChange={(e) => this.setState({value2: e.target.value})}
                        type="number" 
                        placeholder="Category ID"
                        className="form-control" 
                        />
                    Course Desciption
                        <Input 
                        name="des"
						value={this.state.value3}					
                        onChange={(e) => this.setState({value3: e.target.value})}
                        type="text" 
                        placeholder="Course Desciption"
                        className="form-control" 
                        //validations={[required, minLength]}
                        />
                    Course Price
                        <Input 
                        name="des"
						value={this.state.value4}					
                        onChange={(e) => this.setState({value4: e.target.value})}
                        type="number" 
                        placeholder="Course Price"
                        className="form-control" 
                        />
                    </div>
                    <div className="padding-left">
                    StartDate
                    <Input 
                        name="des"
						value={this.state.value5}					
                        onChange={(e) => this.setState({value5: e.target.value})}
                        type="text" 
                        placeholder="StartDate"
                        className="form-control" 
                        //validations={[required]}
                        />
                    EndDate
                    <Input 
                        name="des"
						value={this.state.value6}					
                        onChange={(e) => this.setState({value6: e.target.value})}
                        type="text" 
                        placeholder="EndDate"
                        className="form-control" 
                        //validations={[required]}
                        />
                    Slot Available
                        <Input 
                        name="des"
						value={this.state.value7}					
                        onChange={(e) => this.setState({value7: e.target.value})}
                        type="number" 
                        placeholder="Slot Available"
                        className="form-control" 
                        />
                     Slot Registered
                        <Input 
                        name="des"
						value={this.state.value8}					
                        onChange={(e) => this.setState({value8: e.target.value})}
                        type="number" 
                        placeholder="Slot Registered"
                        className="form-control" 
                        /></div>
                        <label 
                            className={labelClass}
                            onDragEnter={this.onDragEnter}
                            onDragLeave={this.onDragLeave} 
                            onDragOver={this.onDragOver}
                            onDrop={this.onDrop}
                            style={{outlineColor: borderColor}}>
                            <iframe 
								title="file"
								width='300px'
								height='250px'
								src={this.getImgLink(this.props.image.imageName)}
								className={this.props.image.imageName && 'loaded'}
							/>
                            <i className="icon icon-upload" 
                                style={{ color: iconColor }}></i>
                             <Input name="img" onChange={this.fileChangedHandler} type="file" placeholder="CategoryImage" className="form-control" />
                            </label>
                            <p>Drop an image or click to open the file picker.</p>
                            <button className="btn btn-info btn-block saveinfo" type="submit" >Save</button>
                    <CheckButton style={{ display: 'none' }} ref={c => { this.checkBtn = c }}  onClick={this.close}/>
                </Form>
				</div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
	 image: state.imageReducer
});
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(fetchCourses, dispatch) }
}

export default connect(mapStateToProps)(NewCourse);


