'use strict';

$(document).ready(function() {
  getStock();
});

function getStock() {
  var totalPos = 0;
  var totalAsset = 0;
  var $update;
  var $sell;

  $('#buyStock').click(function() {
    var symbol = $('#symbolInput').val();
    var shares = $('#numShares').val();
    $update = $('<input type="button" id="update" value ="Update" />');
    $sell = $('<input type="button" id="sell" value ="Sell" />');
    var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + symbol + '&callback=?';

    if (!symbol || !isNaN(symbol)) {
      alert('Enter valid input');
    } else {
      $.getJSON(url, function(data) {
        console.log(data);

        var $divData = $('<div id="dataId">');
        $divData.addClass('dataDesign');
        var $position = parseInt(shares) * parseInt(data.LastPrice);
        var $display = $divData.html('Name: ' + data.Name + '<br />' + 'Symbol: ' + data.Symbol + '<br />' + 'Price: ' + '$' + data.LastPrice + ' per share' + '<br />' + ' Position: ' + '$' + $position + '<br />' + shares + ' Shares' + '<br />');
        $('#stockData').append($display);
        $display.append($update, $sell);

        console.log('current position: ' + $position);

        totalPos += $position;
        console.log('total position: ' + totalPos);
        $('#totalPos').html('Total Position: ' + totalPos);

        totalAsset = totalPos + totalBal;
        console.log(totalAsset);
        $('#totalAsset').html('Total Assets: ' + totalAsset);

        $update.click(function() {
          console.log(data.LastPrice);
        });

        $sell.click(function() {
          console.log('working sells');
        });
      });
    }
  });

  var totalBal = 0;
  $('#addCash').click(function() {
    var input = $('#cashInput').val();
    var total = parseFloat(input);
    totalBal += total;
    $('#sum').html('Balance: ' + totalBal);
    totalAsset = totalPos + totalBal;
    $('#totalAsset').html('Total Assets: ' + totalAsset);
  });

}
