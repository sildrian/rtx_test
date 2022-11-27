import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';
import ShowAbout from '@/components/ShowAbout.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

describe('ShowAbout.vue', () => {
  it('renders props.msg when passed', () => {
    const msgabout = 'new message';
    const wrapper = shallowMount(ShowAbout, {
      props: { msgabout },
    });
    expect(wrapper.text()).toMatch(msgabout);
  });
});
