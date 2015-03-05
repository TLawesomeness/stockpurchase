'use strict';

$(document).ready(function() {
  getStock();
});

function getStock() {
  var totalPos = 0;
  var totalAsset = 0;
  var $update;
  var $sell;
  var currentBal = 0;

  $('#buyStock').click(function() {

    var symbol = $('#symbolInput').val();
    var shares = $('#numShares').val() * 1;
    $update = $('<input type="button" id="update" value ="Update" />');
    $sell = $('<input type="button" id="sell" value ="Sell" />');
    var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + symbol + '&callback=?';
    // var remainBal;
    $.getJSON(url, function(data) {
      var $position = parseInt(shares) * parseInt(data.LastPrice);

      if (!symbol || !isNaN(symbol)) {
        alert('Enter valid input');
      } else if (currentBal === 0) {
        alert('You have no money!');
      } else if ($position > currentBal) {
        alert('Too expensive!');
      } else {

        var $divData = $('<div id="dataId">');
        $divData.addClass('dataDesign');

        var name = 'Name: ' + data.Name + '<br />';
        var symb = 'Symbol: ' + data.Symbol + '<br />';
        var price = 'Price: ' + '$' + data.LastPrice + ' per share' + '<br />';
        var share = 'Position: ' + '$' + $position + '<br />' + shares + ' Shares' + '<br />';
        var $display = $divData.html(name + symb + price + share);
        $('#stockData').append($display);
        $display.append($update, $sell);
        console.log('current position: ' + $position);

        //   remainBal = currentBal - $position;
        // if ($('#stockData')) {
        //   console.log('after buy: ' + remainBal);
        //   $('#sum').html('Balance: ' + remainBal);
        // }
        currentBal = currentBal - $position;
        console.log('current balance after buy: ' + currentBal);
        $('#sum').html('Current Balance: ' + currentBal);

        totalPos += $position;
        console.log('total position: ' + totalPos);
        $('#totalPos').html('Total Position: ' + totalPos);

        totalAsset = totalPos + currentBal;
        console.log(totalAsset);
        $('#totalAsset').html('Total Assets: ' + totalAsset);

        $update.click(function() {
          $.getJSON(url, function(data) {
            price = 'Price: ' + '$' + data.LastPrice + ' per share' + '<br />';
            $display = $divData.html(name + symb + price + share);
            $('#stockData').append($display);
            $display.append($update, $sell);
            console.log(data.LastPrice);
          });
        });

        $sell.click(function() {
          $('#sum').html('Balance: ' + (currentBal += $position));
          $('#totalPos').html('Total Position: ' + (totalPos -= $position));
          $divData.remove();
        });
      }
    });
  });

  $('#addCash').click(function() {
    var input = $('#cashInput').val();
    var total = parseFloat(input);
    currentBal += total;
    $('#sum').html('Balance: ' + currentBal);
    totalAsset = totalPos + currentBal;
    $('#totalAsset').html('Total Assets: ' + totalAsset);
  });

}
