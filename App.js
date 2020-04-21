import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity , Alert } from 'react-native';
import { Button } from 'react-native-elements' ;
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons' ;

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      gameState: [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ] ,
      currentPlayer: 1 ,

    }
  }
  componentDidMount(){
    this.initializeGame() ;
  }

  initializeGame = () => {
    this.setState({
      gameState:
      [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ] , currentPlayer: 1 
    })
    
  }
  
  renderIcon = (row , col) => {
    var value = this.state.gameState[row][col] ;
    switch(value){
      case 1: return <Icon name="close" style={styles.tileX}/> ;
      case -1: return <Icon name="circle-outline" style={styles.tileO}/> ;
      default: <View />
    }

  }
  
   
  buttonClicked = (msg) => {
    alert("Hi there   " + msg  ) ;
  }


getWinner = () =>{
 var sum ;
 const NUM_TILES = 3 ;
 var arr = this.state.gameState ;

 // check on row 
 for(var i=0 ; i< NUM_TILES ; i++){
   sum = arr[i][0]+ arr[i][1] + arr[i][2] ;
   if(sum == 3){
     return 1 ;
   }
   else if( sum == -3){
     return -1 ;
   }
 }

 // check on cloumn 
 for(var i=0 ; i< NUM_TILES ; i++){
  sum = arr[0][i]+ arr[1][i] + arr[2][i] ;
  if(sum == 3){
    return 1 ;
  }
  else if( sum == -3){
    return -1 ;
  }
}

// check on diagonals
sum = arr[0][0] + arr[1][1] + arr[2][2] ;
  if(sum == 3){
    return 1 ;
  }
  else if( sum == -3){
    return -1 ;
  }

  sum = arr[0][2] + arr[1][1] + arr[2][0] ;
  if(sum == 3){
    return 1 ;
  }
  else if( sum == -3){
    return -1 ;
  }

 

// no winners 
return 0 ;

}



  onTilePress = (row,col) => {
    var value = this.state.gameState[row][col]
    if(value != 0 ){return ; }
    var currentPlayer = this.state.currentPlayer ;
    var arr = this.state.gameState.slice() ;
    arr[row][col] = currentPlayer ;
    this.setState({gameState:  arr}) ;

    var nextPlayer 
    if(currentPlayer == 1 ) { 
      nextPlayer = -1 ;
    }
    else{
      nextPlayer = 1 ;
    }
    this.setState({currentPlayer : nextPlayer}) ;

var winner = this.getWinner() ;
    if(winner == 1){
      Alert.alert("Player 1stgi is the winner") ;
      this.initializeGame() ;
}
    else if(winner == -1){
      Alert.alert("Player 2nd  is the winner") ;
      this.initializeGame() ;
    }


  }
  resetPress = () => {
    this.initializeGame() ;
  }

  render() {
  return (
    <View  style={styles.container}>

      <Text style = {{fontSize: 50, color: 'black' }}> Tic Tac Toe </Text>

      <View style = {{padding: 70}}/> 
      
      <View style={{flexDirection: "row"}}>
        <TouchableOpacity onPress={() => this.onTilePress(0,0)} style={[styles.tile, {borderLeftWidth: 0 , borderTopWidth: 0}]}>
          {this.renderIcon(0,0)} 
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onTilePress(0,1)}  style={[styles.tile , {borderTopWidth: 0}]}>
          {this.renderIcon(0,1)}
          </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onTilePress(0,2)}  style={[styles.tile , {borderRightWidth: 0 , borderTopWidth: 0}]}>
          {this.renderIcon(0,2)}
          </TouchableOpacity> 
      </View>
      
      <View style={{flexDirection: "row"}}>
        <TouchableOpacity onPress={() => this.onTilePress(1,0)} style={[styles.tile , { borderLeftWidth: 0}]}>  
        {this.renderIcon(1,0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onTilePress(1,1)}  style={styles.tile } >  
        {this.renderIcon(1,1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onTilePress(1,2)} style={[styles.tile , {borderRightWidth: 0} ]}>  
        {this.renderIcon(1,2)}
        </TouchableOpacity>
      </View>
      
      <View style={{flexDirection: "row"}}>
        <TouchableOpacity onPress={() => this.onTilePress(2,0)}  style={[styles.tile , {borderLeftWidth:0, borderBottomWidth: 0}] }>
          {this.renderIcon(2,0)}
          </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onTilePress(2,1)}  style={[styles.tile , {borderBottomWidth: 0 }]}>  
        {this.renderIcon(2,1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onTilePress(2,2)}  style={[ styles.tile , { borderBottomWidth: 0 , borderRightWidth: 0 }]}>  
        {this.renderIcon(2,2)}
        </TouchableOpacity>
      </View>
      
      <View style = {{padding: 50}}/> 
      <Button title="Reset Game" onPress = {this.resetPress }   />
      
    </View>
      
  );
} ;
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
     
    

    

  },
  tile : {
    borderWidth: 6 ,
    width: 100 ,
    height: 100 ,
    alignItems: 'center',
    justifyContent: 'center',


  } ,
  tileX : {
    color: 'red' ,
    fontSize : 70 ,
    
  },
  tileO : {
    color: 'grey' ,
    fontSize: 70 ,
    



  }
});
