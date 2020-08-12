import { toast, Icon } from '@gotitinc/design-system';
import React from 'react';

const showPositiveToast = (message) => toast.success(() => (
  <div className="u-flex u-flexGrow-1">
    <div className="u-marginRightExtraSmall">
      <Icon name="checkmarkCircle" size="medium" />
    </div>
    <div className="u-flexGrow-1">
      <div className="u-fontMedium u-marginBottomExtraSmall">{message}</div>
    </div>
  </div>
), {
});

export default showPositiveToast;
