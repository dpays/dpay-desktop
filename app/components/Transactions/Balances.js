// @flow
import React, { Component } from 'react';
import { Divider, Header, Icon, Segment, Statistic, Table } from 'semantic-ui-react';
import _ from 'lodash';
import NumericLabel from '../../utils/NumericLabel';
import AccountName from '../global/AccountName';

export default class PendingReward extends Component {
  getBalances(data) {
    const props = this.props.dpay.props;
    const totalVestsDPay = parseFloat(props.total_vesting_fund_dpay.split(' ')[0])
    const totalVests = parseFloat(props.total_vesting_shares.split(' ')[0])
    const mapping = {
      BBD: ['bbd_balance'],
      BBD_SAVINGS: ['savings_bbd_balance'],
      BEX: ['balance'],
      BEX_SAVINGS: ['savings_balance'],
      VESTS: ['vesting_shares']
    };
    const balances = {
      BBD: 0,
      BBD_SAVINGS: 0,
      BEX: 0,
      BEX_SAVINGS: 0,
      VESTS: 0,
      BP: 0
    };
    if (!data) {
      return {
        BBD: <Icon name="asterisk" loading />,
        BEX: <Icon name="asterisk" loading />,
        VESTS: <Icon name="asterisk" loading />,
        BP: <Icon name="asterisk" loading />
      };
    }
    _.forOwn(mapping, (fields: Array, assignment: string) => {
      _.forEach(fields, (field) => {
        const [value] = data[field].split(' ');
        balances[assignment] += parseFloat(value);
      });
    });
    balances.BP = totalVestsDPay * balances.VESTS / totalVests;
    return balances;
  }
  render() {
    let display = false;
    if (this.props.dpay.props) {
      const accounts = this.props.account.accounts;
      const names = this.props.keys.names;
      const t = this;
      const balances = names.map((account) => {
        return (accounts && accounts[account]) ? t.getBalances(accounts[account]) : {};
      });
      const totals = {
        BBD: balances.reduce((BBD, balance) => BBD + parseFloat(balance.BBD) + parseFloat(balance.BBD_SAVINGS), 0),
        BEX: balances.reduce((BEX, balance) => BEX + parseFloat(balance.BEX) + parseFloat(balance.BEX_SAVINGS), 0),
        VESTS: balances.reduce((VESTS, balance) => VESTS + parseFloat(balance.VESTS), 0),
        BP: balances.reduce((BP, balance) => BP + parseFloat(balance.BP), 0),
      };
      const numberFormat = {
        shortFormat: true,
        shortFormatMinValue: 1000
      };
      display = (
        <Segment basic>
          <Header>
            Total Wallet Balance
          </Header>
          <Segment>
            <Statistic.Group size="tiny" widths="four">
              <Statistic
                value={<NumericLabel params={numberFormat}>{totals.BBD}</NumericLabel>}
                label="BBD"
              />
              <Statistic
                value={<NumericLabel params={numberFormat}>{totals.BEX}</NumericLabel>}
                label="BEX"
              />
              <Statistic
                value={<NumericLabel params={numberFormat}>{totals.BP}</NumericLabel>}
                label="BP"
              />
              <Statistic
                value={<NumericLabel params={numberFormat}>{totals.VESTS}</NumericLabel>}
                label="VESTS"
              />
            </Statistic.Group>
          </Segment>
          <Divider />
          <Header>
            Account Balances
          </Header>
          <Table celled unstackable attached color="blue">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="right">
                  Account
                </Table.HeaderCell>
                <Table.HeaderCell colSpan={2} textAlign="right">
                  Available to Spend
                </Table.HeaderCell>
                <Table.HeaderCell colSpan={2} textAlign="right">
                  Savings Account
                </Table.HeaderCell>
                <Table.HeaderCell colSpan={2} textAlign="right">
                  Locked
                </Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>
                  Name
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  BBD
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  BEX
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  BBD
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  BEX
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  BP
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  VESTS
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {names.map((account, i) => (
                <Table.Row key={account}>
                  <Table.Cell>
                    <AccountName name={account} />
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    <NumericLabel params={numberFormat}>{balances[i].BBD}</NumericLabel>
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    <NumericLabel params={numberFormat}>{balances[i].BEX}</NumericLabel>
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    <NumericLabel params={numberFormat}>{balances[i].BBD_SAVINGS}</NumericLabel>
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    <NumericLabel params={numberFormat}>{balances[i].BEX_SAVINGS}</NumericLabel>
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    <NumericLabel params={numberFormat}>{balances[i].BP}</NumericLabel>
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    <NumericLabel params={numberFormat}>{balances[i].VESTS}</NumericLabel>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>
      );
    }
    return display;
  }
}
