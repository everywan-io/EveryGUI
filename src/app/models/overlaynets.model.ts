export enum OverlayNetType {
    IPv4Overlay = 'IPv4Overlay',
    IPv6Overlay = 'IPv6Overlay'
}



export class OverlayNet {
    id: string;
    name: string;
    description: string;
    tenantId: string;
    slices: [];
    tunnelType: string;
    type: OverlayNetType;

    defineExtraProperties() {
        
    }
}
