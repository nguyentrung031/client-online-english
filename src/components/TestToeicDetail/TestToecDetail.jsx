import React, {Component} from 'react';
import './TestToeicDetail.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { fetchToeicDetailRequet } from '../../store/Action/toeic';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
	formControl: {
	  margin: theme.spacing(3),
	},
  }));
  

class TestToeicDetail extends Component{
	// eslint-disable-next-line no-useless-constructor
	constructor(props){
		super(props);
		this.state = {
			isTrues :[],
			totalReading: 0,
			totalListenning:0,
			totalPoint:0
		}
	}
	

	componentDidMount(){
		const {fetchToeicDetailRequet} = this.props;
		console.log(this.props);
		fetchToeicDetailRequet(this.props.match.params.id, 3);
	}

	isExistState(id){
		var temp = this.state.isTrues ;
		if(temp.length > 0){
			var data = temp.filter(item=>{
				return item.id == id; 
			})
			if(data.length > 0){
				return true;
			}
			return false;
		}
		return false;
	}

    handleChange = (event) => {
		if(event.target){
			const {toeicDetail} = this.props;
			let idAnswer = event.target.value;
			let indexQuestion = event.target.getAttribute('name');
			let data = toeicDetail[0].Paragraphs[0].ExamQuestions[indexQuestion].ExamAnswers.filter(item => {
				return item.answerID == idAnswer;
			});
			if(data.length !== 0 && !this.isExistState(data[0].questionID)){
				let obj = {};
				obj.id = data[0].questionID;
				obj.isTrue = data[0].isTrue;
				obj.idType = 1;
				let temp = this.state.isTrues;
				temp.push(obj);
				this.setState({
					isTrues : temp
				});
			} else if(data.length !== 0 && this.isExistState(data[0].questionID)){
				let temp2 = this.state.isTrues;
				let index = 0;
				for(let i=0; i<temp2.length; i++)
				{
					if(temp2[i].id == data[0].id){
						index = i;
						break;
					}
				}
				temp2[index].isTrue = data[0].isTrue;
				temp2.splice(index,1).splice(index,0,temp2[index]);
				this.setState({
					isTrues : temp2
				})
			}
		}
	}

	showState = ()=>{
		this.pointOfTest(this.state.isTrues);
		console.log(this.state);
	}

	pointOfTest(dataPoint){
			
			let totalListening = 0;
			let totalReading = 0;
            let pointReading = 0;
			let pointListening = 0;
			dataPoint.forEach(element => {
				if(element.idType == 1 || element.idType == 2 || element.idType == 3 || element.idType == 4){
					totalListening++;
				}
				else {
					totalReading++;
				}
			});
            if (totalListening < 7) pointListening = 5;
            else if (totalListening < 39)
            {
                pointListening = (totalListening - 6) * 5 + 5;
            }
            else if (totalListening < 45)
            {
                pointListening = (totalListening - 39) * 5 + 180;
            }
            else if (totalListening < 54)
            {
                pointListening = (totalListening - 45) * 5 + 220;
            }
            else if (totalListening < 70)
            {
                pointListening = (totalListening - 54) * 5 + 270;
            }
            else if (totalListening < 75)
            {
                pointListening = (totalListening - 70) * 5 + 360;
            }
            else if (totalListening < 80)
            {
                pointListening = (totalListening - 75) * 5 + 390;
            }
            else if (totalListening < 85)
            {
                pointListening = (totalListening - 80) * 5 + 420;
            }
            else if (totalListening < 88)
            {
                pointListening = (totalListening - 85) * 5 + 450;
            }
            else if (totalListening < 93)
            {
                pointListening = (totalListening - 88) * 5 + 470;
            }
            else 
            {
                pointListening = 495;
            }

            if (totalReading < 10) pointReading = 5;
            else if (totalReading < 25)
            {
                pointReading = (totalReading - 10) * 5 + 5;
            }
            else if (totalReading < 28)
            {
                pointReading = (totalReading - 25) * 5 + 90;
            }
            else if (totalReading < 39)
            {
                pointReading = (totalReading - 28) * 5 + 115;
            }
            else if (totalReading < 47)
            {
                pointReading = (totalReading - 39) * 5 + 170;
            }
            else if (totalReading < 52)
            {
                pointReading = (totalReading - 47) * 5 + 220;
            }
            else if (totalReading < 55)
            {
                pointReading = (totalReading - 52) * 5 + 250;
            }
            else if (totalReading < 64)
            {
                pointReading = (totalReading - 55) * 5 + 270;
            }
            else if (totalReading < 82)
            {
                pointReading = (totalReading - 64) * 5 + 320;
            }
            else if (totalReading < 89)
            {
                pointReading = (totalReading - 82) * 5 + 405;
            }
            else if (totalReading < 98)
            {
                pointReading = (totalReading - 89) * 5 + 445;
            }
            else
            {
                pointReading = 495;
			}
			let total = pointReading + pointListening;
			this.setState({
				totalReading: totalReading,
				totalListenning: totalListening,
				totalPoint:total
			}, ()=> alert(`Bạn đã trả lời đúng: ${this.state.totalReading} câu đọc, ${this.state.totalListenning} và đạt ${this.state.totalPoint}/990 điểm`));
	}

	render(){
		const {toeicDetail, classes} = this.props;

		return (
    		<div className="container">
			<span className="wrap-title">Bài làm</span>
			<div className="test-toeic-detail">
				<h4 className="test-title">Phần I: phần 1</h4>
				{
					
				    toeicDetail.length > 0 ? toeicDetail[0].Paragraphs[0].ExamQuestions.map((item, key) => {
						if(key < 20){
							return (
								<div className="test-toeic-detail-item"  key={key}>
									<FormControl component="fieldset" className={classes.formControl}>
									<h6 className="test-detail-text"><small>Câu {key+1} </small>{item.questionContent}</h6>
										<p className="text-detail-text-i1">Chọn đáp án đúng: </p>
										<FormLabel component="legend"></FormLabel>
										{/* 0:doc    1:nghe */}
										<RadioGroup aria-label="gender" name={key}  onChange={this.handleChange}>
											<FormControlLabel value={item.ExamAnswers[0].answerID.toString()}  control={<Radio />} label={item.ExamAnswers[0].answerContent} />
											<FormControlLabel value={item.ExamAnswers[1].answerID.toString()} control={<Radio />} label={item.ExamAnswers[1].answerContent} />
											<FormControlLabel value={item.ExamAnswers[2].answerID.toString()}  control={<Radio />} label={item.ExamAnswers[2].answerContent} />
											<FormControlLabel value={item.ExamAnswers[3].answerID.toString()}  control={<Radio />} label={item.ExamAnswers[3].answerContent} />
										</RadioGroup>
									</FormControl>
								</div>
							)
						}
						return null;
					}) : ''
				}
			</div>
			<div className="test-toeic-detail">
			</div>
			<div className="button-summit">
				<input type="submit" onClick={this.showState} className="btn btn-info i1" value="Nộp bài" />	
			</div>
  		<div className="modal" id="myModal">
    		<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">Kết quả: </h4>
							{/* <button type="button" className="close" data-dismiss="modal">&times;</button> */}
						</div>
						<div className="modal-body">
			<h6>Bạn đã trả lời đúng: {this.state.totalReading} câu đọc, {this.state.totalListenning} và đạt {this.state.totalPoint}/990 điểm</h6>
						</div>
						<div className="modal-footer">
							<a href="/TestToeic/">Thoát</a>
						</div>
					</div>
				</div>
			</div>
    </div>
  );
	}
  
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		fetchToeicDetailRequet: bindActionCreators(fetchToeicDetailRequet, dispatch)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		toeicDetail: state.toeic.toeicDetail
	}
}

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(TestToeicDetail));