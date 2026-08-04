/* eslint-disable @loomhq/loom/no-js-extension */
import { UploadIcon } from '@js/common/upload-icon';
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import { Text } from '@loomhq/lens';

import './styles.less';

// TODO(next author): Please convert this into a functional component
// eslint-disable-next-line react-prefer-function-component/react-prefer-function-component
class SharePageDropzone extends Component {
  state = {
    dragging: false,
  };

  render() {
    const { multiple = false } = this.props;
    const { dragging } = this.state;

    return (
      <Dropzone
        className="share-page-dropzone"
        disableClick={true}
        multiple={multiple}
        disabled={false}
        activeStyle={{ zIndex: 1000, position: 'absolute' }}
        onDragEnter={() => this.setState({ dragging: true })}
        onDragLeave={() =>
          this.setState({
            dragging: false,
          })
        }
        onDrop={this.handleDrop}
      >
        <>
          {dragging && (
            <div className="share-page-drag-and-drop-overlay">
              <div className="drag-and-drop-overlay-content p:xlarge">
                <div className="flex pb:xlarge justify:center">
                  <UploadIcon color="var(--lns-color-white)" size={13} />
                </div>
                <Text
                  size="heading-md"
                  color="white"
                  fontWeight="bold"
                  alignment="center"
                >
                  Drop here!
                </Text>
              </div>
            </div>
          )}
        </>
      </Dropzone>
    );
  }

  handleDrop = files => {
    this.setState({ dragging: false });
    this.props.onDrop(files);
  };
}

// eslint-disable-next-line import/no-default-export
export default SharePageDropzone;
