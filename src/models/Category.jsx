import React, {Component} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { connect } from "react-redux";
import { fetchCategories, removeCategory } from "../services/CategoryService";
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Link } from "react-router-dom";
import {Button} from 'primereact/button';
import NewCategory from './NewCategory.jsx';
import Modal from 'react-modal';
import { ReactPDF  } from 'react-pdf';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Category extends Component {
	constructor(props) {
        super(props);
		this.state = {
            showModal: false,
			numPages: null,
			pageNumber: 1,
        };
        this.removeHandle = this.removeHandle.bind(this)
		this.openNew = this.openNew.bind(this)
		this.openModal = this.openModal.bind(this);
		this.onEditCate = this.onEditCate.bind(this);
		this.onNewCate = this.onNewCate.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}
    categoryImg(rowData,column) {
        var src = "/images/catagory/" + rowData.CategoryImage;
		console.log ("src " ,src)
        return <img src={src} alt={rowData.CategoryImage} width="48px" />;
    }
    removeHandle(e) {
		var id = this.state.selected.CategoryID;
        this.props.dispatch(removeCategory(id));
    }
	
	componentDidMount() {
		
		this.props.dispatch(fetchCategories());
    }
    
	actionCategory() {
        return <NewCategory modalIsOpen={true}/>;
    }
	
	openNew() {
		console.log(" ediItem: ",  this.ediItem)
        return <div>
				<Modal
				  isOpen={this.state.modalIsOpen}
				  onHide={this.closeModal}
				  style={customStyles}
				  contentLabel="New Catagory"
				>
				<button className="btn btn-info btn-block close-button" onClick={this.closeModal}></button>
				<NewCategory category={this.ediItem} onclose={this.closeModal} />
				</Modal >			
        </div>;
    }
	
	openModal() {
		this.setState({modalIsOpen: true});
	}

	onEditCate(e) {
		this.ediItem = e.data
		this.openModal();
	}
	onNewCate() {

		this.ediItem = "";
		this.openModal();
	}
	
	closeModal() {
		this.setState({modalIsOpen: false});
	}
	
	onDocumentLoad = ({ numPages }) => {
		this.setState({ numPages });
	}
	
    render() {
	    var eCount = this.props.categories.items ? this.props.categories.items.length: 0;
        var header = <div className="p-clearfix" style={{'lineHeight':'1.87em'}}>List of Categories </div>;
        var footer = "There are " + eCount + ' Categories';

    return (
        <div className="content-section implementation">
        <DataTable selectionMode="single" onRowDoubleClick={this.onEditCate} value={this.props.categories.items} style={{width: '780px;'}} header={header} footer={footer}
			selection={this.state.selected} onSelectionChange={(e) => this.setState({selected: e.data})}
		>	
            <Column field="CategoryID" header="CategoryID" />
            <Column field="CategoryName" header="CategoryName" />
            <Column field="CategoryDescription" header="CategoryDescription" />
            <Column field="CategoryImage" header="CategoryImage"  body={this.categoryImg} style={{textAlign:"center"}}/>   
        </DataTable>
		 <Button  onClick={this.removeHandle} type="button" label="Delete" className="p-button-info"  style={{marginRight: '.5em'}} >
            </Button>
		<Button  onClick={this.onNewCate} type="button" label="New Catagory" className="p-button-info"  style={{marginRight: '.5em'}} >
				</Button>
			{this.openNew()}
        </div>
    );
    }
}

const mapStateToProps = state => ({
	 categories: state.categoryReducer
});
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(fetchCategories,dispatch) }
}
export default connect(mapStateToProps)(Category);
