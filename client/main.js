'use strict';

$(document).ready(function() {
  getStock();
});

function getStock() {
  var currentBal = 0;
  var totalPos = 0;
  var totalAsset = 0;
  var $update;
  var $sell;

  $('#addCash').click(function() {
    var input = $('#cashInput').val();
    var total = parseFloat(input);
    if (!input) {
      alert('Please put some money in...');
    } else {
      currentBal += total;
      $('#sum').html('Balance: ' + currentBal);
      totalAsset = totalPos + currentBal;
      $('#totalAsset').html('Total Assets: ' + totalAsset);
    }
  });

  $('#buyStock').click(function() {

    var symbol = $('#symbolInput').val();
    var shares = $('#numShares').val() * 1;
    var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + symbol + '&callback=?';
    $update = $('<input type="button" id="update" value ="Update" />');
    $sell = $('<input type="button" id="sell" value ="Sell" />');

    $.getJSON(url, function(data) {
      var $position = parseInt(shares) * parseInt(data.LastPrice);

      if (!symbol || !isNaN(symbol)) {
        alert('Enter a valid input');
      } else if (currentBal === 0) {
        alert('You have no money!');
      } else if ($position > currentBal) {
        alert('Too expensive!');
      } else if (symbol !== data.Symbol) {
        alert('Please input correct symbol or check capitalization');
      } else {

        var $divData = $('<div>');
        $divData.addClass('dataDesign');
        var name = 'Name: ' + data.Name + '<br />';
        var symb = 'Symbol: ' + data.Symbol + '<br />';
        var price = 'Price: ' + '$' + parseFloat(data.LastPrice) + ' per share' + '<br />';
        var share = 'Position: ' + '$' + $position + '<br />' + shares + ' Shares' + '<br />';
        var $display = $divData.html(name + symb + price + share);
        $('#stockData').append($display);
        $display.append($update, $sell);

        currentBal = currentBal - $position;
        // console.log('current balance after buy: ' + currentBal);
        $('#sum').html('Current Balance: ' + currentBal);

        totalPos += $position;
        // console.log('total position: ' + totalPos);
        $('#totalPos').html('Total Position: ' + totalPos);

        totalAsset = totalPos + currentBal;
        // console.log('total assets: ' + totalAsset);
        $('#totalAsset').html('Total Assets: ' + totalAsset);

        $sell.click(function() {
          $('#sum').html('Balance: ' + (currentBal += $position));
          $('#totalPos').html('Total Position: ' + (totalPos -= $position));
          $divData.remove();
        });

        $update.click(function() {
          $.getJSON(url, function(data) {
            var $div = $('<div>');
            $div.addClass('dataDesign');
            price = 'Price: ' + '$' + parseFloat(data.LastPrice) + ' per share' + '<br />';
            $div.html('Name: ' + data.Name + '<br />' + 'Symbol: ' + data.Symbol + '<br />' + price + 'Position: ' + '$' + $position + '<br />' + shares + ' Shares' + '<br />');
            $('#showData').append($div);
            alert('Updated price for ' + data.Name + ' is: $' + data.LastPrice);
            // console.log('updated quote: ' + data.LastPrice);
          });
        });
      }
    });
  });
}
