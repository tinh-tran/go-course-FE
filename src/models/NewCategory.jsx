import React, {Component} from 'react';
import {DataTable} from 'primereact/datatable';
import {FileUpload} from 'primereact/fileupload';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { connect } from "react-redux";
import { fetchCategories,saveCategory } from "../services/CategoryService";
import { uploadImage,embedImage } from "../services/ImageService";
import { bindActionCreators } from 'redux';
import {Button} from 'primereact/button';
import Input from 'react-validation/build/input';
import { isEmpty } from 'validator';
import Form from 'react-validation/build/form';
import CheckButton from 'react-validation/build/button';
const axios = require("axios");

class NewCategory extends React.Component {
	constructor(props) {
        super(props);
		console.log("props",this.props.category)
        this.state = {
            value: null,
			value1: this.props.category ? this.props.category.CategoryName : "",
			value2: this.props.category ? this.props.category.CategoryDescription : "",
			selectedFile: null,
			selectedUrl: null,
        };
		this.props.image.imageName = this.props.category ? this.props.category.CategoryImage : "";
        this.saveHandle = this.saveHandle.bind(this);
		this.onEmbed = this.onEmbed.bind(this);
		
    }
    
    saveHandle(e) {
		e.preventDefault();
        this.form.validateAll();
        if ( this.checkBtn.context._errors.length === 0 ) {
                var CategoryName = this.state.value1
                var CategoryDescription = this.state.value2
                var CategoryImage = this.props.image.imageName
				var CategoryID = this.props.category ? this.props.category.CategoryID : 0
				console.log("CategoryID " , CategoryID)
                var category =	JSON.stringify({CategoryID,CategoryName,CategoryDescription,CategoryImage})
                this.props.dispatch(saveCategory(category));
        }
		this.props.onclose();
    }
	
	fileChangedHandler = (event) => {
		this.props.dispatch(uploadImage(event.target.files[0],"category"));
	}
	
	urlChangedHandler = (event) => {
		 this.setState({ selectedUrl: event.target.value });
	}
	
	getImgLink = (imgname) => {
		if (imgname){
			var n = imgname.indexOf("://www");
			console.log(imgname);
			if(n > 0)
				return imgname;
			return "/images/catagory/"+ imgname;
		}
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
    
	onEmbed(e) {
		if(this.state.selectedUrl){
			this.props.dispatch(embedImage(this.state.selectedUrl));
		}
    }
	
    onDrop(e) {
        e.preventDefault();
        this.setState({ active: false });
        this.onFileChange(e, e.dataTransfer.files[0]);
    }

    
    onFileChange(e, file) {
        var file = file || e.target.files[0],
            pattern = /image-*/,
            reader = new FileReader();
            
        if (!file.type.match(pattern)) {
            alert('Formato inválido');
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
                <Form onSubmit={e => this.saveHandle(e)} ref={c => { this.form = c }} style={{width: '600px'}}>
					<h1 style={{ textAlign: 'center' }}>Update Form</h1>
					<hr/>
					<div className="padding-right" style={{width: '160px'}}>
						<p>Category Name : </p>
						<p>Category Description : </p>
						<br/><br/>	
						<p>Drop an file or click to open the file picker.</p>
						<p>Or embeds the url from the internet </p>
					</div>
					<div className="padding-left">			 
						<Input 
							name="name"
							value={this.state.value1}						
							onChange={(e) => this.setState({value1: e.target.value})}
							type="text" 
							placeholder="CategoryName"
							className="form-control" 
							validations={[required, minLength]}
						/>
						<Input 
							name="des"
							value={this.state.value2}					
							onChange={(e) => this.setState({value2: e.target.value})}
							type="text" 
							placeholder="CategoryDescription"
							className="form-control" 
							validations={[required, minLength]}
						/>
						<label 
							className={labelClass}
							onDragEnter={this.onDragEnter}
							onDragLeave={this.onDragLeave} 
							onDragOver={this.onDragOver}
							onDrop={this.onDrop}
							style={{outlineColor: borderColor,marginLeft:'-5px',width: '350px'}}>
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
					</div>
					<br/>
					
				
					<div className="padding-right" style={{width: '400px'}}>
						<Input 
							name="url"
							type="text"
							value={this.props.image.imageName}								
							placeholder="CategoryDescriptionc"
							className="form-control" 
							onChange={this.urlChangedHandler}/>
						<button className="btn btn-info btn-block saveinfo" type="submit" >Save</button>
					</div>
					<div id="dd" className="padding-left"  style={{width: '200px'}}>					
						<Button style={{marginLeft:'-30px',marginTop:'2px'}} onClick={this.onEmbed} type="button" label="Embed URL" className="p-button-info" />
                    </div>
				
					<br/>
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
  return { actions: bindActionCreators(fetchCategories, dispatch) }
}

export default connect(mapStateToProps)(NewCategory);


