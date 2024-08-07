import React from 'react';
import { TextField, Button } from '@mui/material';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

interface ShortenerLinkState {
  url: string;
  shortUrl: string;
  qrCode: string;
  errorMessage: string;
  result: string;
}

class ShortenerLink extends React.Component<{}, ShortenerLinkState> {
  constructor(props: any) {
    super(props);
    this.state = {
      url: '',
      shortUrl: '',
      qrCode: '',
      errorMessage: '',
      result: '',
    };

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleShorten = this.handleShorten.bind(this);
    this.handleQrCode = this.handleQrCode.bind(this);
  }

  handleValueChange = (event: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
    event.preventDefault();
    this.setState({
      url: event.target.value,
    });
  }

  handleShorten = async () => {
    if (this.state.url === '') {
      this.setState({
        errorMessage: 'Link cannot be empty',
        result: 'error',
      });
      return;
    }

    const data = JSON.stringify({
      url: this.state.url,
    });

    const response = await fetch(`${BASE_URL}/api/url`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data,
    });

    console.log('response', response);

    if (response.ok) {
      const data = await response.json();
      this.setState({
        shortUrl: data.shortUrl,
        result: 'shortened',
      });
    } else {
      const error = await response.json();
      this.setState({
        errorMessage: error.message,
        result: 'error',
      });
    }
  }

  handleQrCode = async () => {
    if (this.state.url === '') {
      this.setState({
        errorMessage: 'Link cannot be empty',
        result: 'error',
      });
      return;
    }

    const data = JSON.stringify({
      url: this.state.url,
    });

    const response = await fetch(`${BASE_URL}/api/qr`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data,
    })

    if (response.ok) {
      const data = await response.json();
      this.setState({
        qrCode: data.qrCode,
        result: 'qrCode',
      });
    } else {
      const error = await response.json();
      this.setState({
        errorMessage: error.message,
        result: 'error',
      });
    }
  }

  handleCopy = () => {
    navigator.clipboard.writeText(this.state.shortUrl);
  }

  handleDownload = () => {
    const link = document.createElement('a');
    link.href = this.state.qrCode;
    link.download = `qr-code-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  render(): React.ReactNode {
    const buttonStyle = {
      width: 200,
      margin: 5
    }
    const resultStyle = {
      height: 200,
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center'
    }
    const marginResult = {
      margin: 10,
    }

    let result
    if (this.state.result === 'shortened') {
      result = <div style={resultStyle}>
        <p style={marginResult} contentEditable>Shortened link: {this.state.shortUrl}</p>
        <Button variant='contained' style={buttonStyle} onClick={
          () => {this.handleCopy()}
        }>Copy</Button>
    </div>;
    } else if (this.state.result === 'qrCode') {
      result = <div style={resultStyle}>
        <img src={this.state.qrCode} alt='QR code' style={{
          ...marginResult,
          width: 200,
          height: 200,
          border: '1px solid black',
        }} />
        <Button variant='contained' style={buttonStyle} onClick={
          () => {this.handleDownload()}
        }>Download</Button>
    </div>;
    } else if (this.state.result === 'error') {
      result = <div style={resultStyle}>
        <p style={marginResult}>Failed to shorten link: {this.state.errorMessage}</p>
      </div>;
    } else {
       result = <div style={resultStyle}></div>;
    }

    return (
      <div>
        <TextField id='input-link' label='Your Links' variant='outlined' style={{
          minWidth: 600,
          margin: 10,
        }} onChange={(event) => {this.handleValueChange(event)}} />
        <div>
          <Button variant='contained' style={buttonStyle}  onClick={
          () => {this.handleShorten()}
        } >Shorten</Button>
          <Button variant='contained' style={buttonStyle}  onClick={
          () => {this.handleQrCode()}
        } >Qr-Code</Button>
        </div>
        {result}
      </div>
    )
  }
}

export default ShortenerLink;
